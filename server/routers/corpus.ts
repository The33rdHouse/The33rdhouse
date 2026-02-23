import { router, publicProcedure, protectedProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { documents, documentDownloads } from '../../drizzle/schema';
import { z } from 'zod';
import { eq, and, like, or, desc, asc } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

/**
 * Corpus Router
 * Manages the Sacred Corpus - 1,365 canonical documents
 */
export const corpusRouter = router({
  /**
   * Import corpus from CSV (admin only)
   * Populates the documents table from master index
   */
  importFromCSV: protectedProcedure
    .mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user || user.role !== 'admin') {
        throw new Error('Admin access required');
      }

      const CSV_PATH = process.env.CORPUS_CSV_PATH || path.resolve('data/33rdhouse_master_index.csv');
      
      // Read CSV file
      const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
      const lines = csvContent.split('\n');
      
      let imported = 0;
      let skipped = 0;

      // Process each line (skip header)
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parse CSV line
        const values = parseCSVLine(line);
        
        if (values.length < 8) {
          skipped++;
          continue;
        }

        const [rowId, canonId, source, relativePath, filename, contentStatus, fileSizeMb, sha256Hash, timestamp] = values;

        // Extract file type from filename
        const fileExt = path.extname(filename).slice(1).toLowerCase();

        // Determine access tier and category
        const accessTier = determineAccessTier(relativePath);
        const category = determineCategory(relativePath);

        try {
          await db.insert(documents).values({
            rowId: parseInt(rowId),
            canonId,
            source,
            relativePath,
            filename,
            contentStatus,
            fileSizeMb,
            fileType: fileExt,
            sha256Hash,
            category,
            accessTier,
            originalTimestamp: timestamp ? new Date(timestamp) : null,
          });
          imported++;
        } catch (error: any) {
          // Skip duplicates
          if (error.code === 'ER_DUP_ENTRY') {
            skipped++;
          } else {
            console.error(`[Corpus Import] Error importing ${canonId}:`, error.message);
            skipped++;
          }
        }
      }

      return {
        success: true,
        imported,
        skipped,
        total: imported + skipped,
      };
    }),

  /**
   * Get all documents with filtering and pagination
   */
  browse: protectedProcedure
    .input(z.object({
      category: z.string().optional(),
      fileType: z.string().optional(),
      search: z.string().optional(),
      accessTier: z.enum(['free', 'seeker', 'initiate', 'elder', 'admin']).optional(),
      page: z.number().default(1),
      limit: z.number().default(50),
      sortBy: z.enum(['filename', 'category', 'createdAt', 'fileSizeMb']).default('filename'),
      sortOrder: z.enum(['asc', 'desc']).default('asc'),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user) throw new Error('User not authenticated');

      // Build where conditions
      const conditions = [];

      // Access control: user can only see documents at or below their tier
      const tierHierarchy = ['free', 'seeker', 'initiate', 'elder', 'admin'];
      const userTierIndex = tierHierarchy.indexOf(user.subscriptionTier);
      const allowedTiers = tierHierarchy.slice(0, userTierIndex + 1);
      
      // Filter by category
      if (input.category) {
        conditions.push(eq(documents.category, input.category));
      }

      // Filter by file type
      if (input.fileType) {
        conditions.push(eq(documents.fileType, input.fileType));
      }

      // Search in filename or relative path
      if (input.search) {
        conditions.push(
          or(
            like(documents.filename, `%${input.search}%`),
            like(documents.relativePath, `%${input.search}%`)
          )
        );
      }

      // Get documents
      const offset = (input.page - 1) * input.limit;
      
      const docs = await db
        .select()
        .from(documents)
        .where(and(...conditions))
        .limit(input.limit)
        .offset(offset)
        .orderBy(
          input.sortOrder === 'asc' 
            ? asc(documents[input.sortBy]) 
            : desc(documents[input.sortBy])
        );

      // Filter by access tier in memory (since we can't use IN with enum)
      const filteredDocs = docs.filter(doc => 
        allowedTiers.includes(doc.accessTier)
      );

      return {
        documents: filteredDocs,
        page: input.page,
        limit: input.limit,
        total: filteredDocs.length,
      };
    }),

  /**
   * Get document by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user) throw new Error('User not authenticated');

      const [doc] = await db
        .select()
        .from(documents)
        .where(eq(documents.id, input.id))
        .limit(1);

      if (!doc) {
        throw new Error('Document not found');
      }

      // Check access
      if (!hasDocumentAccess(user, doc)) {
        throw new Error('You do not have access to this document');
      }

      return doc;
    }),

  /**
   * Get document download URL
   */
  getDownloadUrl: protectedProcedure
    .input(z.object({ documentId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user) throw new Error('User not authenticated');

      const [doc] = await db
        .select()
        .from(documents)
        .where(eq(documents.id, input.documentId))
        .limit(1);

      if (!doc) {
        throw new Error('Document not found');
      }

      // Check access
      if (!hasDocumentAccess(user, doc)) {
        throw new Error('You do not have access to this document');
      }

      // Log download
      await db.insert(documentDownloads).values({
        documentId: doc.id,
        userId: user.id,
        downloadedAt: new Date(),
      });

      // Return download URL (S3 or Google Drive)
      return {
        downloadUrl: doc.s3Url || `https://drive.google.com/file/d/${doc.googleDriveId}/view`,
        filename: doc.filename,
        fileSize: doc.fileSizeMb,
        sha256Hash: doc.sha256Hash,
      };
    }),

  /**
   * Get corpus statistics
   */
  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user) throw new Error('User not authenticated');

      // Get total documents
      const allDocs = await db.select().from(documents);
      
      // Count by category
      const byCategory: Record<string, number> = {};
      const byFileType: Record<string, number> = {};
      const byAccessTier: Record<string, number> = {};
      let totalSize = 0;

      allDocs.forEach(doc => {
        // Category
        const cat = doc.category || 'Uncategorized';
        byCategory[cat] = (byCategory[cat] || 0) + 1;

        // File type
        const type = doc.fileType || 'unknown';
        byFileType[type] = (byFileType[type] || 0) + 1;

        // Access tier
        byAccessTier[doc.accessTier] = (byAccessTier[doc.accessTier] || 0) + 1;

        // Total size
        if (doc.fileSizeMb) {
          totalSize += parseFloat(doc.fileSizeMb);
        }
      });

      // Filter accessible documents for this user
      const tierHierarchy = ['free', 'seeker', 'initiate', 'elder', 'admin'];
      const userTierIndex = tierHierarchy.indexOf(user.subscriptionTier);
      const allowedTiers = tierHierarchy.slice(0, userTierIndex + 1);
      
      const accessibleDocs = allDocs.filter(doc => 
        allowedTiers.includes(doc.accessTier)
      );

      return {
        total: allDocs.length,
        accessible: accessibleDocs.length,
        totalSizeMb: totalSize.toFixed(2),
        byCategory,
        byFileType,
        byAccessTier,
      };
    }),
});

/**
 * Parse CSV line handling quoted fields with commas
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

/**
 * Determine access tier based on file path
 */
function determineAccessTier(relativePath: string): 'free' | 'seeker' | 'initiate' | 'elder' | 'admin' {
  const path = relativePath.toLowerCase();
  
  if (path.includes('public') || path.includes('free')) {
    return 'free';
  }
  
  if (path.includes('admin') || path.includes('legal') || path.includes('compliance')) {
    return 'admin';
  }
  
  if (path.includes('complete') || path.includes('master') || path.includes('advanced')) {
    return 'elder';
  }
  
  if (path.includes('codex') || path.includes('system') || path.includes('ceremonial')) {
    return 'initiate';
  }
  
  return 'seeker';
}

/**
 * Determine category based on file path
 */
function determineCategory(relativePath: string): string {
  const path = relativePath.toLowerCase();
  
  if (path.includes('legal') || path.includes('compliance') || path.includes('aml')) {
    return 'Legal & Compliance';
  }
  
  if (path.includes('codex') || path.includes('scroll') || path.includes('ceremonial')) {
    return 'Sacred Texts';
  }
  
  if (path.includes('system') || path.includes('config') || path.includes('index')) {
    return 'System Documentation';
  }
  
  if (path.includes('astro') || path.includes('celestial') || path.includes('cosmic')) {
    return 'Astrological';
  }
  
  if (path.includes('business') || path.includes('operational') || path.includes('roadmap')) {
    return 'Operational';
  }
  
  if (path.includes('template') || path.includes('form')) {
    return 'Templates & Forms';
  }
  
  if (path.includes('brand') || path.includes('logo') || path.includes('design')) {
    return 'Brand & Design';
  }
  
  return 'General';
}

/**
 * Check if user has access to a document
 */
function hasDocumentAccess(user: any, doc: any): boolean {
  // Admin has access to everything
  if (user.role === 'admin') {
    return true;
  }

  // Check tier hierarchy
  const tierHierarchy = ['free', 'seeker', 'initiate', 'elder', 'admin'];
  const userTierIndex = tierHierarchy.indexOf(user.subscriptionTier);
  const docTierIndex = tierHierarchy.indexOf(doc.accessTier);

  return userTierIndex >= docTierIndex;
}
