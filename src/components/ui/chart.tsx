
import * as React from "react"
import { cn } from "@/lib/utils"

// This is a simple wrapper component for chart components
export function ChartContainer({
  children,
  className,
  config,
  ...props
}: React.HTMLProps<HTMLDivElement> & {
  config?: any
}) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      {children}
    </div>
  )
}

// This is a tooltip content component
export function ChartTooltipContent({ 
  active, 
  payload, 
  label, 
  formatter,
  className,
  ...props
}: any) {
  if (active && payload && payload.length) {
    return (
      <div 
        className={cn(
          "bg-white p-3 border border-gray-200 shadow-md rounded-md", 
          className
        )}
        {...props}
      >
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => {
          const value = formatter ? formatter(entry.value, entry.name) : entry.value
          return (
            <div 
              key={`tooltip-item-${index}`} 
              className="flex items-center gap-2 text-sm"
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }} 
              />
              <span>{entry.name}: </span>
              <span className="font-medium">{Array.isArray(value) ? value[0] : value}</span>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

// Export custom tooltip that can be used with Recharts
export function ChartTooltip(props: any) {
  return props.content
}
