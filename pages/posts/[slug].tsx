import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
const Container = dynamic(() => import("@/components/Container"));
const PostBody = dynamic(() => import("@/components/PostBody"));
const MoreStories = dynamic(() => import("@/components/MoreStories"));
const Header = dynamic(() => import("@/components/Header"));
const PostHeader = dynamic(() => import("@/components/PostHeader"));
const SectionSeparator = dynamic(() => import("@/components/SectionSeparator"));
const Layout = dynamic(() => import("@/components/Layout"));
const PostTitle = dynamic(() => import("@/components/PostTitle"));
const Tags = dynamic(() => import("@/components/Tags"));
import { getAllPostSlugs, getPostAndMorePosts } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import { Post } from "@/lib/types";

interface PostPage {
  post: Post;
  posts: Post[];
  preview: boolean;
}

export default function PostPage({
  post,
  posts,
  preview,
}: PostPage): JSX.Element {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostHeader post={post} />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && (
                  <Tags tags={post.tags.edges.map(({ node }) => node)} />
                )}
              </footer>
            </article>

            <SectionSeparator />
            {posts.length > 0 && <MoreStories posts={posts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: Number.parseInt(process.env.TIMER_REFRESH_POSTS),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostSlugs();

  return {
    paths: allPosts.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
};
