/**
 * BlogPost — Individual blog post page
 * Fetches post by slug from the database.
 */

import PageLayout from "@/components/PageLayout";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.bySlug.useQuery(
    { slug: params.slug ?? "" },
    { enabled: !!params.slug }
  );

  if (isLoading) {
    return (
      <PageLayout title="Loading... | Brent's Blog | Workshop Creative Group">
        <section className="page-hero">
          <div className="container">
            <div className="h-8 bg-white/10 rounded w-1/2 animate-pulse" />
          </div>
        </section>
        <section className="section-py bg-white">
          <div className="container max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${85 - i * 5}%` }} />
            ))}
          </div>
        </section>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout title="Story Not Found | Brent's Blog | Workshop Creative Group">
        <section className="page-hero">
          <div className="container">
            <h1 className="text-display text-4xl text-white mb-4">Story Not Found</h1>
            <p className="text-white/70 mb-6">This story doesn't exist or hasn't been published yet.</p>
            <Link href="/blog" className="btn-ghost-white">
              Back to Brent's Blog
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${post.title} | Brent's Blog | Workshop Creative Group`}
      description={post.excerpt ?? undefined}
    >
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Brent's Blog
            </Link>
            <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              {post.title}
            </h1>
            <p className="text-white/50 text-sm">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {post.audioUrl && (
              <div className="mb-8 p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">Audio available</p>
                  <a href={post.audioUrl} className="text-blue-700 text-sm font-medium hover:underline">
                    Listen to this article
                  </a>
                </div>
              </div>
            )}

            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-serif">
                {post.excerpt}
              </p>
            )}

            {post.content ? (
              <div className="prose-wscg">
                {post.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-400">Full article content coming soon.</p>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <Link href="/blog" className="btn-secondary text-sm">
                ← Back to Brent's Blog
              </Link>
              <Link href="/request-quote" className="btn-primary text-sm">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
