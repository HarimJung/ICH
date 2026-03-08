import { Step } from "@/types";

const stepStyles: Record<string, string> = {
  "1": "bg-gray-100 text-gray-600",
  "2a": "bg-amber-50 text-amber-700",
  "2b": "bg-amber-100 text-amber-800",
  "3": "bg-teal-50 text-teal-700",
  "4": "bg-blue-50 text-blue-800",
  "5": "bg-green-50 text-green-800",
};

const stepLabels: Record<number, string> = {
  1: "Step 1",
  2: "Step 2b",
  3: "Step 3",
  4: "Step 4",
  5: "Step 5",
};

export default function StepBadge({
  step,
  label,
}: {
  step: Step;
  label?: string;
}) {
  const displayLabel = label || stepLabels[step];
  const styleKey = displayLabel.replace("Step ", "").toLowerCase();
  const style = stepStyles[styleKey] || stepStyles["5"];

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {displayLabel}
    </span>
  );
}
