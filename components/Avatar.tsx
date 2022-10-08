import Image from "next/image";
import { Author } from "@/lib/types";

interface Avatar {
  author: Author;
}

export default function Avatar({ author }: Avatar): JSX.Element {
  const { name, avatar } = author;

  return (
    <div className="flex items-center justify-start">
      {avatar && avatar.url ? (
        <div className="w-12 h-12 relative mr-4">
          <Image
            src={avatar.url}
            layout="fill"
            className="rounded-full"
            alt={name}
          />
        </div>
      ) : null}
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
