import { Category } from "@/types";

const categoryStyles: Record<Category, string> = {
  Quality: "bg-gray-100 text-gray-700 border-gray-300",
  Safety: "bg-gray-100 text-gray-700 border-gray-300",
  Efficacy: "bg-gray-100 text-gray-700 border-gray-300",
  Multidisciplinary: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${categoryStyles[category]}`}
    >
      {category}
    </span>
  );
}
