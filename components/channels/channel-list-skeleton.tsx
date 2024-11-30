import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function ChannelListSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Channel</TableHead>
            <TableHead className="w-[15%]">User</TableHead>
            <TableHead className="w-[15%]">State</TableHead>
            <TableHead className="w-[10%]">Prefetch</TableHead>
            <TableHead className="w-[10%]">Unacked</TableHead>
            <TableHead className="w-[10%]">Consumers</TableHead>
            <TableHead className="w-[10%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="w-[30%] text-center">
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-4 w-[60px]" />
                  <Skeleton className="h-3 w-[180px]" />
                </div>
              </TableCell>
              <TableCell className="w-[15%] text-center">
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-3 w-[60px]" />
                </div>
              </TableCell>
              <TableCell className="w-[15%] text-center">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </TableCell>
              <TableCell className="w-[10%] text-center">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-4 w-[30px]" />
                </div>
              </TableCell>
              <TableCell className="w-[10%] text-center">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-4 w-[30px]" />
                </div>
              </TableCell>
              <TableCell className="w-[10%] text-center">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-4 w-[30px]" />
                </div>
              </TableCell>
              <TableCell className="w-[10%] text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
