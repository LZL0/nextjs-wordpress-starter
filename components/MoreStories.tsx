import PostPreview from "@/components/PostPreview";
import { Post } from "@/lib/types";

interface MoreStories {
  posts: Post[];
}

export default function MoreStories({ posts }: MoreStories): JSX.Element {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
