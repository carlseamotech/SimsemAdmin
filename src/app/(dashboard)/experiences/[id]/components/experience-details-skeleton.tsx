import { Skeleton } from "@/components/ui/skeleton";

export const ExperienceDetailsSkeleton = () => {
  return (
    <div className="flex-1 py-6 px-8">
      <div className="bg-white rounded-xl drop-shadow-lg flex flex-col">
        <div className="text-[15px] border-b-2 border-[#0D2E61] text-[#3D3D3DCC] px-8 py-4 pb-6">
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="space-y-8 px-8 py-6">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="m-8 space-y-8 shadow-lg drop-shadow-lg rounded-2xl p-8">
          <div className="border-b rounded-none shadow-none flex justify-between items-center py-6">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-16 w-32 rounded-full" />
          </div>
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl p-6 bg-[#3D3D3D0D] flex flex-col gap-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-3 items-center w-full lg:w-1/2 h-[55px]">
                <Skeleton className="h-full w-full" />
                <Skeleton className="h-full w-full" />
                <Skeleton className="h-full w-full" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
            <div className="rounded-2xl p-6 bg-[#3D3D3D0D] space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="relative w-full aspect-[887/312] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
