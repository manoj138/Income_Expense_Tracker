import React from "react";
import { Zap } from "lucide-react";

const PageLoader = ({
  className = "h-[60vh]",
  ringColor = "border-blue-600",
  iconColor = "text-blue-500",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 ${ringColor}`} />
        <Zap
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse ${iconColor}`}
          size={30}
        />
      </div>
    </div>
  );
};

export default PageLoader;
