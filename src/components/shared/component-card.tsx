import { cn } from "@/utils";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
  desc?: string;
}

export function ComponentCard({
  title,
  children,
  className = "",
  description = "",
  desc = "",
}: ComponentCardProps) {
  const descText = description || desc;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        {descText && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {descText}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div
        className={cn(
          "space-y-6 border-t border-gray-100 p-4 sm:p-6 dark:border-gray-800",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default ComponentCard;
