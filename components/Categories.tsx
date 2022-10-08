import { Category } from "@/lib/types";

interface Categories {
  categories: Category[];
}

export default function Categories({ categories }: Categories): JSX.Element {
  return (
    <span className="ml-1">
      under
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <span key={category.id} className="ml-1">
            {category.name}
          </span>
        ))
      ) : (
        <span className="ml-1">Other</span>
      )}
    </span>
  );
}
