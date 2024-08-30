import { cn } from "@/lib/utils";
import React from "react";

export default function ErrorMessage({
  message,
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    message && (
      <div
        className={cn(
          "p-2 rounded-md border border-red-300 bg-red-100 text-sm",
          className
        )}
      >
        {message}
      </div>
    )
  );
}
