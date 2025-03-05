import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";


export function SkeletonCard() {
    return (
        <Card className="container overflow-hidden">
        <CardHeader className="p-4">
            <Skeleton className="h-5 w-1/2" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <Skeleton className="h-24 w-full mb-4" />
            <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-9 rounded-full" />
        </CardFooter>
        </Card>
    )
}

