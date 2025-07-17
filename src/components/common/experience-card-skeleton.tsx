import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ExperienceCardSkeleton = () => {
  return (
    <Card className="p-0 transition-all duration-200">
      <CardContent className="p-4">
        <div className="aspect-[4/5] flex flex-col gap-4">
          <Skeleton className="flex-[3] w-full rounded-lg" />
          <div className="flex-[2] flex flex-col justify-start space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
