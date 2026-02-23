import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Download, Eye } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import ProgressiveImage from "@/components/ProgressiveImage";
import { SkeletonBookCard } from "@/components/SkeletonCard";

export default function Library() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all books from database
  const { data: allBooks, isLoading } = trpc.products.getAll.useQuery();

  // Filter books by category
  const books = useMemo(() => allBooks?.filter(p => p.category === 'book') || [], [allBooks]);

  const filteredBooks = useMemo(() => 
    books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (book.author?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    ),
    [books, searchQuery]
  );

  const featuredBooks = useMemo(() => books.filter(b => b.featured), [books]);
  // Organize books by gate number instead of subcategory
  const codexBooks = useMemo(() => books.filter(b => b.gateNumber && b.gateNumber <= 4), [books]);
  const curriculumBooks = useMemo(() => books.filter(b => b.gateNumber && b.gateNumber >= 5 && b.gateNumber <= 8), [books]);
  const guideBooks = useMemo(() => books.filter(b => b.gateNumber && b.gateNumber >= 9 && b.gateNumber <= 10), [books]);
  const manualBooks = useMemo(() => books.filter(b => b.gateNumber && b.gateNumber >= 11), [books]);
  const instituteBooks = useMemo(() => books.filter(b => !b.gateNumber), [books]);

  const BookCard = ({ book }: { book: typeof books[0] }) => (
    <Card className="border-purple-900/30 bg-black/40 hover:border-purple-600/50 transition-all group overflow-hidden">
      <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-b from-purple-950/50 to-black">
        <ProgressiveImage
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
        
        {book.featured && (
          <Badge className="absolute top-3 right-3 bg-purple-600 text-white border-0">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-purple-200 line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-purple-400">by {book.author}</p>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
          {book.description}
        </p>

        <div className="flex gap-2 pt-2">
          <Link href={`/library/${book.id}`} className="flex-1">
            <button className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 transition-colors">
              <Eye className="w-4 h-4" />
              Read
            </button>
          </Link>
          <a
            href={`/books/${book.filename}`}
            download
            className="px-2 sm:px-3 py-1.5 sm:py-2 border border-purple-600 hover:bg-purple-950/50 text-purple-300 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Navigation />
      <SEO
        title="Library"
        description="Complete collection of books, curriculum, and resources by Daniel Cruze"
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-purple-200 mb-2 flex items-center gap-3">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
              The Library
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Complete collection of teachings, curriculum, and resources by Daniel Cruze
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search books by title, description, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-purple-950/30 border-purple-900/30 text-purple-200 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-purple-200 mb-6">
                Search Results ({filteredBooks.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              {filteredBooks.length === 0 && (
                <p className="text-center text-gray-500 py-12">
                  No books found matching "{searchQuery}"
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonBookCard key={i} />
              ))}
            </div>
          )}

          {/* Tabs */}
          {!searchQuery && !isLoading && (
            <Tabs defaultValue="featured" className="space-y-8">
              <div className="overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
                <TabsList className="bg-purple-950/30 border border-purple-900/30 inline-flex w-auto gap-1 p-1.5">
                  <TabsTrigger value="featured" className="whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Featured</TabsTrigger>
                  <TabsTrigger value="codex" className="whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Codex ({codexBooks.length})</TabsTrigger>
                  <TabsTrigger value="curriculum" className="whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Curriculum ({curriculumBooks.length})</TabsTrigger>
                  <TabsTrigger value="guides" className="whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Guides ({guideBooks.length})</TabsTrigger>
                  <TabsTrigger value="manuals" className="whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Manuals ({manualBooks.length})</TabsTrigger>
                  <TabsTrigger value="institute" className="whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">Institute ({instituteBooks.length})</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="featured">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="codex">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {codexBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="curriculum">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {curriculumBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="guides">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {guideBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="manuals">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {manualBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="institute">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {instituteBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
}
