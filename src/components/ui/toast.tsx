import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  onClose: () => void;
};

const Toast = ({
  title,
  description,
  variant = "default",
  onClose,
}: ToastProps) => (
  <div
    className={cn(
      "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
      variant === "destructive"
        ? "bg-destructive text-destructive-foreground"
        : "bg-background"
    )}
  >
    <div className="flex items-start p-4">
      <div className="flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && (
          <div className="mt-1 text-sm opacity-90">{description}</div>
        )}
      </div>
      <button
        onClick={onClose}
        className="ml-4 inline-flex rounded-md p-1.5 hover:bg-accent"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export { Toast };
export type { ToastProps };
