import Avatar from "@/components/Avatar";
import Date from "@/components/Date";
import CoverImage from "@/components/CoverImage";
import PostTitle from "@/components/PostTitle";
import Categories from "@/components/Categories";
import { Post } from "@/lib/types";

interface PostHeader {
  post: Post;
}

export default function PostHeader({ post }): JSX.Element {
  const { author, title, date, categories, featuredImage, slug } = post;

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar author={author} />
      </div>
      {featuredImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} featuredImage={featuredImage} slug={slug} />
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar author={author} />
        </div>
        <div className="mb-6 text-lg">
          Posted <Date dateString={date} />
          <Categories categories={categories} />
        </div>
      </div>
    </>
  );
}
