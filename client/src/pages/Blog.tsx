/**
 * Blog — Workshop Creative Group
 * Lists published articles from the blog API without placeholder content.
 */

import PageLayout from "@/components/PageLayout";
import { trpc } from "@/lib/trpc";
import { formatBlogDate } from "@shared/blogPresentation";
import { Link } from "wouter";

export default function Blog() {
  const { data: posts, isLoading, isError, isFetching, refetch } = trpc.blog.list.useQuery();
  const publishedPosts = posts ?? [];
  const featuredPost = publishedPosts.find((post) => post.featured === 1);
  const otherPosts = publishedPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <PageLayout
      title="Blog | Workshop Creative Group"
      description="Insights on printing, design, and project planning from Workshop Creative Group."
    >
      <section className="page-hero" aria-labelledby="blog-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <h1 id="blog-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Blog
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Insights on printing, design, and project planning.
            </p>
          </div>
        </div>
      </section>

      <section className="section-py bg-gray-50" aria-labelledby="articles-heading" aria-busy={isLoading || isFetching}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 id="articles-heading" className="text-heading text-2xl md:text-3xl text-gray-900 mb-8">
              Articles
            </h2>

            {isLoading ? (
              <p role="status" className="text-gray-700 leading-relaxed">
                Loading articles…
              </p>
            ) : isError ? (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <p role="alert" className="text-gray-700 leading-relaxed mb-4">
                  We couldn't load the articles. Please try again.
                </p>
                <button
                  type="button"
                  onClick={() => void refetch()}
                  disabled={isFetching}
                  className="btn-primary text-sm px-6 py-3 disabled:opacity-60"
                >
                  {isFetching ? "Retrying…" : "Retry loading articles"}
                </button>
              </div>
            ) : publishedPosts.length === 0 ? (
              <p role="status" className="text-gray-700 leading-relaxed">
                No articles have been published yet.
              </p>
            ) : (
              <>
                {featuredPost && (
                  <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8" aria-labelledby="featured-article-heading">
                    {featuredPost.coverImageUrl && (
                      <img
                        src={featuredPost.coverImageUrl}
                        alt={featuredPost.coverImageAlt ?? ""}
                        className="block h-auto w-full object-contain"
                        loading="eager"
                        decoding="async"
                      />
                    )}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                          Featured article
                        </span>
                        <time dateTime={new Date(featuredPost.publishedAt).toISOString()} className="text-gray-600 text-sm">
                          {formatBlogDate(featuredPost.publishedAt)}
                        </time>
                      </div>
                      <h3 id="featured-article-heading" className="text-heading text-2xl md:text-3xl text-gray-900 mb-3">
                        <Link href={`/blog/${featuredPost.slug}`} className="hover:text-blue-700 transition-colors duration-200">
                          {featuredPost.title}
                        </Link>
                      </h3>
                      {featuredPost.excerpt && (
                        <p className="text-gray-700 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                      )}
                      <Link href={`/blog/${featuredPost.slug}`} className="btn-primary text-sm px-6 py-3">
                        Read article<span className="sr-only">: {featuredPost.title}</span>
                      </Link>
                    </div>
                  </article>
                )}

                {otherPosts.length > 0 && (
                  <div className="space-y-6">
                    {otherPosts.map((post) => (
                      <article key={post.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden" aria-labelledby={`article-${post.id}-heading`}>
                        {post.coverImageUrl && (
                          <img
                            src={post.coverImageUrl}
                            alt={post.coverImageAlt ?? ""}
                            className="block h-auto w-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        <div className="p-6">
                          <time dateTime={new Date(post.publishedAt).toISOString()} className="block text-gray-600 text-sm mb-3">
                            {formatBlogDate(post.publishedAt)}
                          </time>
                          <h3 id={`article-${post.id}-heading`} className="text-xl font-serif font-semibold text-gray-900 mb-3">
                            <Link href={`/blog/${post.slug}`} className="hover:text-blue-700 transition-colors duration-200">
                              {post.title}
                            </Link>
                          </h3>
                          {post.excerpt && (
                            <p className="text-gray-700 leading-relaxed mb-4">{post.excerpt}</p>
                          )}
                          <Link href={`/blog/${post.slug}`} className="inline-flex min-h-6 items-center text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-800">
                            Read article<span className="sr-only">: {post.title}</span>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                <p className="mt-8 text-gray-700 leading-relaxed">More articles will be added here.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
