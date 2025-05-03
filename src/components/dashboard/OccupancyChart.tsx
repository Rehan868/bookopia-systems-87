
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Mock data for the chart - would come from API in real app
const data = [
  { name: 'Jan', occupancy: 65, revenue: 4000 },
  { name: 'Feb', occupancy: 72, revenue: 4500 },
  { name: 'Mar', occupancy: 80, revenue: 5000 },
  { name: 'Apr', occupancy: 75, revenue: 4800 },
  { name: 'May', occupancy: 85, revenue: 5500 },
  { name: 'Jun', occupancy: 90, revenue: 6000 },
  { name: 'Jul', occupancy: 95, revenue: 6500 },
  { name: 'Aug', occupancy: 88, revenue: 6200 },
  { name: 'Sep', occupancy: 82, revenue: 5800 },
  { name: 'Oct', occupancy: 78, revenue: 5200 },
  { name: 'Nov', occupancy: 70, revenue: 4800 },
  { name: 'Dec', occupancy: 75, revenue: 5000 },
];

export function OccupancyChart() {
  const chartConfig = {
    occupancy: {
      label: "Occupancy Rate (%)",
      theme: { 
        light: "#9b87f5", 
        dark: "#8B5CF6" 
      }
    },
    revenue: {
      label: "Revenue (د.إ)",
      theme: { 
        light: "#10b981", 
        dark: "#10b981" 
      }
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle>Occupancy & Revenue</CardTitle>
        <CardDescription>Yearly overview of occupancy rates and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '12px' }}
              />
              <ChartTooltip 
                content={(props) => (
                  <ChartTooltipContent 
                    {...props}
                    formatter={(value, name) => {
                      return name === "Revenue" 
                        ? [`د.إ ${value}`, "Revenue"] 
                        : [`${value}%`, "Occupancy Rate"];
                    }}
                  />
                )}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="occupancy" 
                stroke="#9b87f5" 
                fillOpacity={1} 
                fill="url(#colorOccupancy)" 
                name="Occupancy"
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                name="Revenue"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
