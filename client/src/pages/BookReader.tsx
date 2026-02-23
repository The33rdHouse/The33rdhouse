import { useParams, Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Download, BookmarkPlus } from "lucide-react";
import { useMemo } from "react";

export default function BookReader() {
  const params = useParams();
  const { user } = useAuth();
  
  // Parse ID and memoize to prevent re-renders
  const bookId = useMemo(() => {
    const id = params.id;
    console.log('[BookReader] Raw param id:', id);
    const parsed = id ? parseInt(id, 10) : null;
    console.log('[BookReader] Parsed id:', parsed);
    return parsed;
  }, [params.id]);
  
  // Fetch book from database
  const { data: book, isLoading, error } = trpc.products.getById.useQuery(
    { id: bookId! },
    { 
      enabled: bookId !== null && !isNaN(bookId),
      retry: 1,
    }
  );

  console.log('[BookReader] Query state:', { 
    bookId, 
    hasBook: !!book, 
    isLoading, 
    errorMessage: error?.message 
  });

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black flex items-center justify-center">
          <div className="text-purple-400">Loading book...</div>
        </div>
      </>
    );
  }

  if (!book || error) {
    console.error('[BookReader] Book not found or error:', { book, error });
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black flex items-center justify-center">
          <Card className="border-purple-900/30 bg-black/40 max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-purple-200 mb-4">Book Not Found</h2>
              <p className="text-gray-400 mb-2">The book you're looking for doesn't exist.</p>
              {error && (
                <p className="text-red-400 text-sm mb-4">Error: {error.message}</p>
              )}
              <p className="text-gray-500 text-xs mb-6">Book ID: {bookId}</p>
              <Link href="/library">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Library
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <SEO
        title={`${book.title} | Library`}
        description={book.description}
      />

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black">
        {/* Header */}
        <div className="border-b border-purple-900/30 bg-black/40">
          <div className="container max-w-7xl mx-auto px-4 py-3 md:py-4">
            {/* Mobile Layout */}
            <div className="md:hidden space-y-3">
              <div className="flex items-center justify-between">
                <Link href="/library">
                  <Button variant="outline" size="sm" className="border-purple-900/30">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Library
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-purple-900/30 px-2">
                    <BookmarkPlus className="w-4 h-4" />
                  </Button>
                  {book.downloadUrl && (
                    <a href={book.downloadUrl} download>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 px-2">
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-purple-200 leading-tight">{book.title}</h1>
                <p className="text-sm text-purple-400 mt-1">by {book.author || 'Daniel Cruze'}</p>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/library">
                  <Button variant="outline" size="sm" className="border-purple-900/30">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Library
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-semibold text-purple-200">{book.title}</h1>
                  <p className="text-sm text-purple-400">by {book.author || 'Daniel Cruze'}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-purple-900/30">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Bookmark
                </Button>
                {book.downloadUrl && (
                  <a href={book.downloadUrl} download>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Book Content */}
        <div className="container max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-8">
          <Card className="border-purple-900/30 bg-black/40 overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full" style={{ height: 'calc(100vh - 180px)' }}>
                {book.downloadUrl ? (
                  <iframe
                    src={book.downloadUrl}
                    className="w-full h-full border-0"
                    title={book.title}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Book content not available for preview</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Book Info */}
          <Card className="border-purple-900/30 bg-black/40 mt-4 md:mt-6">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-purple-200 mb-2">About This Book</h2>
              <p className="text-sm md:text-base text-gray-400 mb-4">{book.description}</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-500">
                <span>Author: <span className="text-purple-400">{book.author || 'Daniel Cruze'}</span></span>
                <span>Category: <span className="text-purple-400">{book.category}</span></span>
                {book.gateNumber && (
                  <span>Gate: <span className="text-purple-400">{book.gateNumber}</span></span>
                )}
                {book.realmNumber && (
                  <span>Realm: <span className="text-purple-400">{book.realmNumber}</span></span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
