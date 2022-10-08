import { Tag } from "@/lib/types";

interface Tags {
  tags: Tag[];
}

export default function Tags({ tags }: Tags): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <p className="mt-8 text-lg font-bold">
        Tagged
        {tags.map((tag) => (
          <span key={tag.id} className="ml-4 font-normal">
            {tag.name}
          </span>
        ))}
      </p>
    </div>
  );
}
