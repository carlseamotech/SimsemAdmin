import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Construction className="w-16 h-16 text-orange-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
          <p className="text-gray-600">
            {description ||
              "This feature is coming soon. Stay tuned for updates!"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
