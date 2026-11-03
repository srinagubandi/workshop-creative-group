import PageLayout from "@/components/PageLayout";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";
import { formatBlogDate, getBlogContentBlocks, getBlogPostMetadata } from "@shared/blogPresentation";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = trpc.blog.bySlug.useQuery(
    { slug: params.slug ?? "" }, { enabled: !!params.slug }
  );

  if (isLoading) return (
    <PageLayout preserveMetadata title="Loading article | Blog | Workshop Creative Group">
      <section className="section-py bg-white"><div className="container max-w-3xl"><p role="status">Loading article…</p></div></section>
    </PageLayout>
  );

  if (!post) return (
    <PageLayout preserveMetadata={isError} noIndex={!isError} title="Article unavailable | Blog | Workshop Creative Group">
      <section className="page-hero"><div className="container">
        <h1 className="text-display text-4xl text-white mb-4">{isError ? "Article temporarily unavailable" : "Article not found"}</h1>
        <p className="text-white/80 mb-6">{isError ? "Please try again shortly." : "This article does not exist or has not been published."}</p>
        <Link href="/blog" className="btn-ghost-white">Back to Blog</Link>
      </div></section>
    </PageLayout>
  );

  return (
    <PageLayout metadata={getBlogPostMetadata(post)}>
      <article aria-labelledby="article-heading">
        <header className="page-hero"><div className="container"><div className="max-w-3xl">
          <Link href="/blog" className="inline-flex min-h-6 items-center text-white/85 underline underline-offset-4 hover:text-white text-sm mb-6">Back to Blog</Link>
          <h1 id="article-heading" className="text-display text-3xl md:text-4xl lg:text-5xl text-white mb-5">{post.title}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/85 text-sm">
            {post.authorName && <p className="text-white">By {post.authorName}</p>}
            <time dateTime={new Date(post.publishedAt).toISOString()}>{formatBlogDate(post.publishedAt)}</time>
          </div>
        </div></div></header>

        <div className="section-py bg-white"><div className="container"><div className="max-w-3xl mx-auto">
          {post.coverImageUrl && <figure className="mb-10">
            <img src={post.coverImageUrl} alt={post.coverImageAlt || post.title} width={1024} height={1024} decoding="async" className="block w-full h-auto rounded-2xl" />
          </figure>}
          {post.audioUrl && <p className="mb-8"><a href={post.audioUrl} className="text-blue-700 underline underline-offset-4">Listen to this article</a></p>}
          {post.content ? <div className="prose-wscg">
            {getBlogContentBlocks(post.content).map((block, i) => block.type === "list"
              ? <ul key={i} className="list-disc pl-6 space-y-2">{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              : <p key={i}>{block.text}</p>)}
          </div> : <p>Full article content is not available yet.</p>}
          <nav aria-label="Article navigation" className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Link href="/blog" className="btn-secondary text-sm">Back to Blog</Link>
            <Link href="/request-quote" className="btn-primary text-sm">Request a Quote</Link>
          </nav>
        </div></div></div>
      </article>
    </PageLayout>
  );
}
