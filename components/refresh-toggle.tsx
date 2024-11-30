"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRefreshStore } from "@/lib/store"
import { RefreshCw } from "lucide-react"

const refreshOptions = [
  { value: 0, label: "Off" },
  { value: 5, label: "5s" },
  { value: 10, label: "10s" },
  { value: 20, label: "20s" },
  { value: 60, label: "60s" },
]

export function RefreshToggle() {
  const { interval, setInterval } = useRefreshStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <RefreshCw className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all" />
          <span className="sr-only">Toggle refresh interval</span>
          {interval > 0 && (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {interval}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {refreshOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setInterval(option.value)}
          >
            <span className={interval === option.value ? "font-bold" : ""}>
              {option.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
