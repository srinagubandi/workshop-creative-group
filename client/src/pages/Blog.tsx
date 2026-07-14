/**
 * Brent's Blog Page — Workshop Creative Group
 * Copy sourced directly from the 2026 WSCG Website Copy Deck
 */

import PageLayout from "@/components/PageLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

// Placeholder blog posts shown when no posts exist in the database yet
const PLACEHOLDER_POSTS = [
  {
    id: 1,
    slug: "featured",
    title: "Featured Story: The Relationships That Shaped the Journey",
    excerpt:
      "A closer look at one of the people, experiences, or lessons that helped shape the journey behind Workshop Creative Group.",
    publishedAt: new Date("2026-01-15"),
    featured: 1,
    audioUrl: null,
    content: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const { data: featured } = trpc.blog.featured.useQuery();

  const displayPosts = posts && posts.length > 0 ? posts : PLACEHOLDER_POSTS;
  const featuredPost = featured || (displayPosts.find((p) => p.featured === 1) ?? null);
  const otherPosts = displayPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <PageLayout
      title="Brent's Blog | Stories, Lessons & Business Relationships | Workshop Creative Group"
      description="Read stories, lessons, and career insights from Brent, featuring the people and experiences that helped shape Workshop Creative Group."
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="blog-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Brent's Blog
            </span>
            <h1 id="blog-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Brent's Blog
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Stories, lessons, and relationships that shaped the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-py bg-white" aria-labelledby="blog-intro-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="section-label mb-4">The Stories</span>
            <h2 id="blog-intro-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              The People and Experiences Behind the Work
            </h2>
            <div className="divider" />
            <div className="prose-wscg">
              <p>
                Over the years, Brent has had the privilege of working with talented people who played an important role in his career and in the growth of Workshop Creative Group. This blog is where those stories are shared, highlighting the people, experiences, and lessons that shaped the path in print, design, branding, and business.
              </p>
              <p>
                Each article is written to be personal, thoughtful, and relevant. Some stories focus on leadership, some on business relationships, and others on moments that changed the way service, creativity, and long-term growth are viewed. Together, they offer a deeper look at the experience and perspective behind the company.
              </p>
            </div>

            {/* Audio section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                Read It or Listen
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                For readers who prefer audio, select articles can also be available in Brent's voice. This creates another way to experience each story while keeping the full written article available on the page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredPost && (
        <section className="pb-16 bg-white" aria-labelledby="featured-heading">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <span className="section-label mb-6">Featured Story</span>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="tag text-xs">Featured</span>
                  <span className="text-gray-400 text-sm">{formatDate(featuredPost.publishedAt)}</span>
                </div>
                <h2 id="featured-heading" className="text-heading text-2xl md:text-3xl text-gray-900 mb-3">
                  {featuredPost.title}
                </h2>
                {featuredPost.excerpt && (
                  <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                )}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  A closer look at one of the people, experiences, or lessons that helped shape the journey behind Workshop Creative Group.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="btn-primary text-sm px-6 py-3"
                  >
                    Read the Full Story
                  </Link>
                  {featuredPost.audioUrl && (
                    <a
                      href={featuredPost.audioUrl}
                      className="btn-secondary text-sm px-6 py-3 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Listen to This Article
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article listing */}
      <section className="section-py bg-gray-50" aria-labelledby="articles-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 id="articles-heading" className="text-heading text-2xl md:text-3xl text-gray-900 mb-8">
              Explore the Stories Behind the Work
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : otherPosts.length > 0 ? (
              <div className="space-y-5">
                {otherPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl p-6 border border-gray-100 card-lift">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-gray-400 text-sm">{formatDate(post.publishedAt)}</span>
                      {post.audioUrl && (
                        <span className="tag text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Audio available
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-700 transition-colors duration-200">
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:gap-2.5 transition-all duration-200"
                    >
                      Read the Full Story
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">Stories Coming Soon</h3>
                <p className="text-gray-500 text-sm">
                  Brent's stories, lessons, and career insights will be published here. Check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-white" aria-labelledby="blog-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="blog-cta-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-gray-500 mb-8">
              Whether the need is large format printing, graphic design, or print procurement — Workshop Creative Group is ready to help.
            </p>
            <Link href="/request-quote" className="btn-primary text-base px-8 py-4">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
