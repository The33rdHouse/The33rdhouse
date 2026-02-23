import { useParams, Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Download, BookmarkPlus } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

// Simple markdown-to-HTML renderer for book content
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-purple-300 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-serif font-bold text-purple-200 mt-10 mb-4 border-b border-purple-900/30 pb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-serif font-bold text-purple-100 mt-12 mb-6">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-purple-200 font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-purple-300">$1</em>')
    .replace(/^---$/gm, '<hr class="border-purple-900/30 my-8" />')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-300 mb-1">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-gray-300 mb-1 list-decimal">$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-purple-600 pl-4 py-2 my-4 text-gray-300 italic">$1</blockquote>')
    .replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed mb-4">')
    .replace(/^(?!<[hhlub])(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return match;
    });
}

export default function BookReader() {
  const params = useParams();
  const { user } = useAuth();

  const bookId = useMemo(() => {
    const id = params.id;
    const parsed = id ? parseInt(id, 10) : null;
    return parsed;
  }, [params.id]);

  const { data: book, isLoading, error } = trpc.products.getById.useQuery(
    { id: bookId! },
    {
      enabled: bookId !== null && !isNaN(bookId),
      retry: 1,
    }
  );

  // Fetch book content from static JSON data at runtime
  const [bookContent, setBookContent] = useState<{ bookId: number; content: string; wordCount: number; chapterCount: number } | null>(null);
  useEffect(() => {
    if (!bookId) return;
    fetch("/data/bookContent.json")
      .then(res => res.json())
      .then((data: any[]) => {
        const found = data.find((bc: any) => bc.bookId === bookId);
        setBookContent(found || null);
      })
      .catch(() => setBookContent(null));
  }, [bookId]);

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
              {book.downloadUrl ? (
                <div className="w-full" style={{ height: 'calc(100vh - 180px)' }}>
                  <iframe
                    src={book.downloadUrl}
                    className="w-full h-full border-0"
                    title={book.title}
                  />
                </div>
              ) : bookContent ? (
                <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-16">
                  {bookContent.wordCount > 0 && (
                    <div className="text-sm text-gray-500 mb-8 flex items-center gap-4">
                      <span>{bookContent.wordCount.toLocaleString()} words</span>
                      {bookContent.chapterCount > 0 && <span>{bookContent.chapterCount} chapters</span>}
                    </div>
                  )}
                  <div
                    className="prose prose-invert prose-purple max-w-none text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(bookContent.content) }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <p className="text-gray-400">Book content not available for preview</p>
                  <p className="text-gray-500 text-sm">Full content will be available after purchase</p>
                </div>
              )}
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
