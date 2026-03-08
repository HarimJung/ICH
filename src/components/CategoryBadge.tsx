import { Category } from "@/types";

const categoryStyles: Record<Category, string> = {
  Quality: "bg-blue-50 text-[#003B5C] border-blue-200",
  Safety: "bg-red-50 text-red-700 border-red-200",
  Efficacy: "bg-purple-50 text-purple-700 border-purple-200",
  Multidisciplinary: "bg-teal-50 text-[#00838F] border-teal-200",
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
