import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

type CalloutType = "info" | "warning" | "danger" | "success";

const icons: Record<CalloutType, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertCircle,
  success: CheckCircle2,
};

const styles: Record<CalloutType, string> = {
  info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  warning: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
  danger: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
  success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const Icon = icons[type];
  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 my-6 text-sm ${styles[type]}`}>
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
