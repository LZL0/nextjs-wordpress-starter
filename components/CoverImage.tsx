import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FeaturedImageNode } from "@/lib/types";

interface CoverImage {
  title: string;
  featuredImage: FeaturedImageNode;
  slug: string;
}

export default function CoverImage({
  title,
  featuredImage,
  slug,
}: CoverImage): JSX.Element {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={featuredImage?.node.sourceUrl}
      className={classnames("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
