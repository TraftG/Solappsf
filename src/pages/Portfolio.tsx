import React, { useState } from "react";
import { SearchBar } from "@/components/UA/SearchBar";
import { Button } from "@/components/UA/Button";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { ActivityChart } from "@/components/Dashboard/ActivityChart";
import { RecentActivity, ActivityItem } from "@/components/Dashboard/RecentActivity";
import { 
  BarChart, 
  LineChart, 
  Users, 
  Globe, 
  Activity, 
  ArrowUpRight,
  Filter,
  Download,
  ChevronDown,
  Plus
} from "lucide-react";

// Sample chart data
const chartData = [
  { name: 'Jan', value: 5400 },
  { name: 'Feb', value: 6800 },
  { name: 'Mar', value: 4900 },
  { name: 'Apr', value: 7200 },
  { name: 'May', value: 8500 },
  { name: 'Jun', value: 7200 },
  { name: 'Jul', value: 9600 },
  { name: 'Aug', value: 8700 },
  { name: 'Sep', value: 11200 },
  { name: 'Oct', value: 9800 },
  { name: 'Nov', value: 12600 },
  { name: 'Dec', value: 13500 },
];

// Sample activity data
const activityItems: ActivityItem[] = [
  {
    id: '1',
    title: 'API Status Update',
    description: 'All systems operational with 99.99% uptime this month',
    timestamp: '2 hours ago',
    type: 'success',
    link: '#'
  },
  {
    id: '2',
    title: 'Usage Limit Warning',
    description: 'API usage approaching 85% of your monthly quota',
    timestamp: '5 hours ago',
    type: 'warning',
  },
  {
    id: '3',
    title: 'New Documentation Available',
    description: 'Updated docs for the payment processing endpoint',
    timestamp: 'Yesterday',
    type: 'info',
    link: '#'
  },
  {
    id: '4',
    title: 'Scheduled Maintenance',
    description: 'Planned downtime on Nov 15 from 2-4 AM UTC',
    timestamp: '2 days ago',
    type: 'info',
  },
  {
    id: '5',
    title: 'Authentication Error Spike',
    description: 'Increase in 401 errors from IP range 192.168.1.x',
    timestamp: '3 days ago',
    type: 'error',
    link: '#'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="pt-28 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Dashboard</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-3">API Gateway Explorer</h1>
              <p className="text-muted-foreground mt-2">Monitor your API performance and usage in real-time</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" leftIcon={<Filter size={16} />}>
                Filters
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<Download size={16} />}
              >
                Export
              </Button>
              <Button leftIcon={<Plus size={16} />}>
                New API Key
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Time Period:</span>
              <button className="flex items-center gap-1 font-medium bg-secondary px-3 py-1.5 rounded-md">
                Last 30 Days
                <ChevronDown size={14} />
              </button>
            </div>
            
            <div className="h-4 border-l border-border"></div>
            
            <span className="text-muted-foreground">Last updated: 5 min ago</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Requests"
            value="4.8M"
            change={12.5}
            trend="up"
            icon={<Activity size={20} />}
            description="October 1-31, 2023"
            className="animate-slide-in" 
            style={{ animationDelay: "0ms" }}
          />
          
          <MetricCard
            title="Active Users"
            value="38.6K"
            change={8.2}
            trend="up"
            icon={<Users size={20} />}
            className="animate-slide-in"
            style={{ animationDelay: "100ms" }}
          />
          
          <MetricCard
            title="Error Rate"
            value="0.42"
            change={-2.1}
            trend="down"
            suffix="%"
            icon={<BarChart size={20} />}
            className="animate-slide-in"
            style={{ animationDelay: "200ms" }}
          />
          
          <MetricCard
            title="Avg. Response Time"
            value="86"
            suffix="ms"
            change={-5.3}
            trend="down"
            icon={<LineChart size={20} />}
            className="animate-slide-in"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ActivityChart 
              data={chartData} 
              title="API Requests" 
              description="Daily request volume across all endpoints"
              className="h-full"
            />
          </div>
          
          <div>
            <RecentActivity 
              items={activityItems}
              viewAllLink="#"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;