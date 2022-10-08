import Avatar from "@/components/Avatar";
import Date from "@/components/Date";
import CoverImage from "@/components/CoverImage";
import Link from "next/link";
import { Post } from "@/lib/types";

interface PostPreview {
  post: Post;
}

export default function PostPreview({ post }): JSX.Element {
  const { title, featuredImage, date, excerpt, author, slug } = post;

  return (
    <div>
      <div className="mb-5">
        {featuredImage && (
          <CoverImage title={title} featuredImage={featuredImage} slug={slug} />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <Avatar author={author} />
    </div>
  );
}
