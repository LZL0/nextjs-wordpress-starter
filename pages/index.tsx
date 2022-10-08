import Head from "next/head";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
const Container = dynamic(() => import("@/components/Container"));
const MoreStories = dynamic(() => import("@/components/MoreStories"));
const HeroPost = dynamic(() => import("@/components/HeroPost"));
const Intro = dynamic(() => import("@/components/Intro"));
const Layout = dynamic(() => import("@/components/Layout"));
import { getPostsForHome } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import { Post } from "@/lib/types";

interface Index {
  posts: Post[];
  preview: boolean;
}

export default function Index({ posts, preview }: Index): JSX.Element {
  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && <HeroPost post={heroPost} />}
        {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts = await getPostsForHome(preview);

  return {
    props: { posts, preview },
    revalidate: Number.parseInt(process.env.TIMER_REFRESH_POSTS),
  };
};
