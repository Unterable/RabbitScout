import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function QueueListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-4 w-[250px] mt-2" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[14%] text-center">Name</TableHead>
              <TableHead className="w-[14%] text-center">Messages</TableHead>
              <TableHead className="w-[14%] text-center">Ready</TableHead>
              <TableHead className="w-[14%] text-center">Unacked</TableHead>
              <TableHead className="w-[14%] text-center">Consumers</TableHead>
              <TableHead className="w-[14%] text-center">State</TableHead>
              <TableHead className="w-[14%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[150px] mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-3 w-[40px] mt-1" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[40px] mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-[40px] mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-4 w-[30px]" />
                    <Skeleton className="h-3 w-[50px] mt-1" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-2 w-2 rounded-full mr-2" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
