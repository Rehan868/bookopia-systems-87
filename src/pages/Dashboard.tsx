
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { TodayActivity } from "@/components/dashboard/TodayActivity";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { BedDouble, ArrowDownToLine, ArrowUpFromLine, Percent, CalendarRange, ClipboardList, UserCog, ChartBar } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";

const Dashboard = () => {
  const { data: stats, isLoading } = useDashboardStats();
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your hotel management dashboard</p>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Available Rooms" 
          value={isLoading ? "Loading..." : stats?.availableRooms || 0}
          description={`Out of ${stats?.totalRooms || 0} total rooms`}
          icon={BedDouble}
          className="animate-slide-up"
        />
        
        <StatCard 
          title="Today's Check-ins" 
          value={isLoading ? "Loading..." : stats?.todayCheckIns || 0}
          description="3 are arriving in the morning"
          icon={ArrowDownToLine}
          className="animate-slide-up [animation-delay:100ms]"
        />
        
        <StatCard 
          title="Today's Check-outs" 
          value={isLoading ? "Loading..." : stats?.todayCheckOuts || 0}
          description="All scheduled before noon"
          icon={ArrowUpFromLine}
          className="animate-slide-up [animation-delay:200ms]"
        />
        
        <StatCard 
          title="Occupancy Rate" 
          value={isLoading ? "Loading..." : `${stats?.occupancyRate || 0}%`}
          trend="up"
          trendValue={stats?.weeklyOccupancyTrend || "+0%"}
          icon={Percent}
          className="animate-slide-up [animation-delay:300ms]"
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <OccupancyChart />
        </div>
        <div>
          <TodayActivity />
        </div>
      </div>
      
      {/* Bookings & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentBookings />
        </div>
        
        <div>
          <div className="border rounded-xl p-6 h-full">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto flex-col p-4 justify-center" asChild>
                <Link to="/bookings/new">
                  <CalendarRange className="h-5 w-5 mb-2" />
                  <span className="text-sm">New Booking</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto flex-col p-4 justify-center" asChild>
                <Link to="/cleaning">
                  <ClipboardList className="h-5 w-5 mb-2" />
                  <span className="text-sm">Cleaning Status</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto flex-col p-4 justify-center" asChild>
                <Link to="/users">
                  <UserCog className="h-5 w-5 mb-2" />
                  <span className="text-sm">Manage Users</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto flex-col p-4 justify-center" asChild>
                <Link to="/reports">
                  <ChartBar className="h-5 w-5 mb-2" />
                  <span className="text-sm">Reports</span>
                </Link>
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-800">
              <p>You have {stats?.pendingMaintenance || 0} maintenance requests pending attention.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
