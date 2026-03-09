import { Step } from "@/types";

const stepStyles: Record<string, string> = {
  "1": "bg-gray-100 text-gray-700",
  "2a": "bg-gray-100 text-gray-700",
  "2b": "bg-gray-100 text-gray-700",
  "3": "bg-gray-100 text-gray-700",
  "4": "bg-gray-100 text-gray-700",
  "5": "bg-gray-100 text-gray-700",
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
