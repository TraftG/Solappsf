
import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  color?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Tag({
  children,
  color = "default",
  size = "md",
  className,
}: TagProps) {
  const colorClasses = {
    default: "bg-secondary text-secondary-foreground",
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/30",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/30",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/30",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/30"
  };

  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-0.5 px-2.5",
    lg: "text-base py-1 px-3"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-medium",
        colorClasses[color],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
