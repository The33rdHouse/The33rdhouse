import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, FileText, Lock, CheckCircle, Filter, Grid, List } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SacredCorpus() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFileType, setSelectedFileType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const limit = 50;

  // Fetch corpus statistics
  const { data: stats } = trpc.corpus.getStats.useQuery();

  // Fetch documents with filters
  const { data: documentsData, isLoading } = trpc.corpus.browse.useQuery({
    search: searchQuery || undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    fileType: selectedFileType !== "all" ? selectedFileType : undefined,
    page,
    limit,
    sortBy: "filename",
    sortOrder: "asc",
  });

  const documents = documentsData?.documents || [];

  // Get unique categories and file types from stats
  const categories = useMemo(() => {
    if (!stats?.byCategory) return [];
    return Object.keys(stats.byCategory).sort();
  }, [stats]);

  const fileTypes = useMemo(() => {
    if (!stats?.byFileType) return [];
    return Object.keys(stats.byFileType).sort();
  }, [stats]);

  const getAccessBadgeColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-green-600';
      case 'seeker': return 'bg-blue-600';
      case 'initiate': return 'bg-purple-600';
      case 'elder': return 'bg-amber-600';
      case 'admin': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const canAccess = (docTier: string) => {
    if (!user) return false;
    const tierHierarchy = ['free', 'seeker', 'initiate', 'elder', 'admin'];
    const userTierIndex = tierHierarchy.indexOf(user.subscriptionTier);
    const docTierIndex = tierHierarchy.indexOf(docTier);
    return userTierIndex >= docTierIndex || user.role === 'admin';
  };

  const utils = trpc.useUtils();

  const handleDownload = async (documentId: number, filename: string) => {
    try {
      const result = await utils.corpus.getDownloadUrl.fetch({ documentId });
      // Open download URL
      window.open(result.downloadUrl, '_blank');
    } catch (error: any) {
      alert(error.message || 'Failed to download document');
    }
  };

  const DocumentCard = ({ doc }: { doc: typeof documents[0] }) => {
    const hasAccess = canAccess(doc.accessTier);

    return (
      <Card className="border-purple-900/30 bg-black/40 hover:border-purple-600/50 transition-all group">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <h3 className="text-sm font-semibold text-purple-200 truncate">
                  {doc.filename}
                </h3>
              </div>
              <p className="text-xs text-gray-400 truncate">{doc.relativePath}</p>
            </div>
            <Badge className={`${getAccessBadgeColor(doc.accessTier)} text-white border-0 flex-shrink-0`}>
              {doc.accessTier}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {doc.category && (
              <Badge variant="outline" className="border-purple-700 text-purple-300">
                {doc.category}
              </Badge>
            )}
            {doc.fileType && (
              <Badge variant="outline" className="border-gray-700 text-gray-300">
                .{doc.fileType}
              </Badge>
            )}
            {doc.fileSizeMb && (
              <Badge variant="outline" className="border-gray-700 text-gray-300">
                {doc.fileSizeMb} MB
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            {hasAccess ? (
              <>
                <Button
                  size="sm"
                  onClick={() => handleDownload(doc.id, doc.filename)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  disabled
                  className="flex-1 bg-gray-700 text-gray-400 cursor-not-allowed"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Locked
                </Button>
                <span className="text-xs text-gray-500">
                  Requires {doc.accessTier}
                </span>
              </>
            )}
          </div>

          <div className="text-xs text-gray-500 font-mono truncate">
            SHA: {doc.sha256Hash.substring(0, 16)}...
          </div>
        </CardContent>
      </Card>
    );
  };

  const DocumentListItem = ({ doc }: { doc: typeof documents[0] }) => {
    const hasAccess = canAccess(doc.accessTier);

    return (
      <Card className="border-purple-900/30 bg-black/40 hover:border-purple-600/50 transition-all">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-purple-400 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-purple-200 truncate mb-1">
                {doc.filename}
              </h3>
              <p className="text-xs text-gray-400 truncate">{doc.relativePath}</p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge className={`${getAccessBadgeColor(doc.accessTier)} text-white border-0`}>
                {doc.accessTier}
              </Badge>
              {doc.fileType && (
                <Badge variant="outline" className="border-gray-700 text-gray-300">
                  .{doc.fileType}
                </Badge>
              )}
              {doc.fileSizeMb && (
                <span className="text-xs text-gray-400">{doc.fileSizeMb} MB</span>
              )}
            </div>

            {hasAccess ? (
              <Button
                size="sm"
                onClick={() => handleDownload(doc.id, doc.filename)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="bg-gray-700 text-gray-400 cursor-not-allowed"
              >
                <Lock className="w-4 h-4 mr-2" />
                Locked
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Navigation />
      <SEO
        title="Sacred Corpus"
        description="Access the complete canonical archive of 1,365 sacred documents"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-200 mb-4">
              Sacred Corpus
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The complete canonical archive of sacred documents, teachings, and resources
            </p>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-purple-900/30 bg-black/40">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400">{stats.total}</div>
                  <div className="text-sm text-gray-400">Total Documents</div>
                </CardContent>
              </Card>
              <Card className="border-purple-900/30 bg-black/40">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">{stats.accessible}</div>
                  <div className="text-sm text-gray-400">Accessible to You</div>
                </CardContent>
              </Card>
              <Card className="border-purple-900/30 bg-black/40">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400">{stats.totalSizeMb}</div>
                  <div className="text-sm text-gray-400">MB Total</div>
                </CardContent>
              </Card>
              <Card className="border-purple-900/30 bg-black/40">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {Object.keys(stats.byCategory).length}
                  </div>
                  <div className="text-sm text-gray-400">Categories</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search and Filters */}
          <Card className="border-purple-900/30 bg-black/40 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/50 border-purple-900/50 text-white"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 bg-black/50 border-purple-900/50 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedFileType} onValueChange={setSelectedFileType}>
                  <SelectTrigger className="w-full md:w-32 bg-black/50 border-purple-900/50 text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {fileTypes.map(type => (
                      <SelectItem key={type} value={type}>.{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-purple-600" : ""}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-purple-600" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid/List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto" />
              <p className="text-gray-400 mt-4">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No documents found</p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {documents.map(doc => (
                    <DocumentCard key={doc.id} doc={doc} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 mb-6">
                  {documents.map(doc => (
                    <DocumentListItem key={doc.id} doc={doc} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-purple-900/50"
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-gray-400">
                  Page {page}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  disabled={documents.length < limit}
                  className="border-purple-900/50"
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
