"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Inbox } from "lucide-react"

interface QueueDistributionChartProps {
  data: {
    name: string
    value: number
  }[]
}

const COLORS = [
  "#3b82f6",
  "#34d399",
  "#f472b6",
  "#a78bfa",
  "#fbbf24",
  "#fb7185",
  "#60a5fa",
]

export function QueueDistributionChart({ data }: QueueDistributionChartProps) {
  if (!data || data.length === 0 || data.every(item => item.value === 0)) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No messages in queues</p>
          <p className="text-sm">Queue distribution chart will appear when messages are present</p>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className="stroke-background hover:opacity-80"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      {data.name}
                    </span>
                    <span className="font-bold">
                      {data.value.toLocaleString()} messages
                    </span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
