"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const PromotionFormSkeleton = () => {
  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-2xl drop-shadow-xl flex flex-col gap-6">
        <div className="border-b-2 border-[#0D2E61] p-6">
          <Skeleton className="h-5 w-48" />
        </div>

        <div className="space-y-6 px-8 pb-8">
          <Skeleton className="h-8 w-64" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-[59px] w-full" />
            </div>
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-[59px] w-full" />
            </div>
          </div>

          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-[59px] w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-[59px] w-full" />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-[59px] w-full" />
              </div>
              <Skeleton className="h-[59px] w-[120px]" />
            </div>
          </div>
        </div>

        <div className="flex justify-between space-x-4 pt-6 border-t border-gray-200 p-8">
          <Skeleton className="h-[48px] w-24" />
          <Skeleton className="h-[48px] w-24" />
        </div>
      </div>
    </div>
  );
};
