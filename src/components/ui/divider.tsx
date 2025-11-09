import { cn } from "@/lib/utils/cn";

export default function Divider({ classNames }: { classNames?: string }) {
  return <div className={cn("h-0 border-b border-border", classNames)} />;
}
