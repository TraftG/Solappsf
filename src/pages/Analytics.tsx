
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/ui-custom/stats-card";
import { analyticsData, games, tokens } from "@/lib/data";
import { BarChart, BarChart3, PieChart, TrendingUp, Users, Wallet } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const COLORS = ["#9945FF", "#b980ff", "#7d37cc", "#6e35bb", "#5e2fa8", "#4e2895"];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("monthly");

  const pieData = analyticsData.topCategories.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  // Format data for monthly charts
  const monthlyData = analyticsData.monthlyStats;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Projects"
          value={analyticsData.totalProjects}
          description={`${analyticsData.liveProjects} live projects`}
          icon={<BarChart className="h-5 w-5" />}
          variant="glass"
          className="reveal-animation"
        />
        <StatsCard
          title="Monthly Active Users"
          value={formatLargeNumber(analyticsData.monthlyActiveUsers)}
          description="Across all projects"
          icon={<Users className="h-5 w-5" />}
          variant="glass"
          className="reveal-animation"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${formatLargeNumber(analyticsData.monthlyRevenue)}`}
          description="Total ecosystem revenue"
          icon={<Wallet className="h-5 w-5" />}
          variant="glass"
          className="reveal-animation"
        />
        <StatsCard
          title="NFT Volume (30d)"
          value={`$${formatLargeNumber(analyticsData.monthlyNftVolume)}`}
          description="Across all marketplaces"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="glass"
          className="reveal-animation"
        />
      </div>

      {/* Tabs and Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Monthly Trends Chart */}
          <Card className="reveal-animation">
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#9945FF" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#6d28d9"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="users"
                      name="Active Users"
                      stroke="#9945FF"
                      fill="#9945FF"
                      fillOpacity={0.2}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue ($)"
                      stroke="#6d28d9"
                      fill="#6d28d9"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Game Categories & NFT Volume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game Categories */}
            <Card className="reveal-animation">
              <CardHeader>
                <CardTitle>Game Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          value,
                          index,
                        }) => {
                          const RADIAN = Math.PI / 180;
                          const radius =
                            25 + innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x =
                            cx + radius * Math.cos(-midAngle * RADIAN);
                          const y =
                            cy + radius * Math.sin(-midAngle * RADIAN);

                          return (
                            <text
                              x={x}
                              y={y}
                              fill="#888888"
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                              fontSize={12}
                            >
                              {pieData[index].name} ({value})
                            </text>
                          );
                        }}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value, name, props) => [
                          `${value} games`,
                          props.payload.name,
                        ]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* NFT Volume */}
            <Card className="reveal-animation">
              <CardHeader>
                <CardTitle>NFT Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `$${formatLargeNumber(value)}`,
                          "NFT Volume",
                        ]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="nftVolume"
                        name="NFT Volume"
                        fill="#9945FF"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card className="reveal-animation">
            <CardHeader>
              <CardTitle>Top Projects by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={games
                      .filter((game) => game.monthlyRevenue)
                      .sort(
                        (a, b) =>
                          (b.monthlyRevenue || 0) - (a.monthlyRevenue || 0)
                      )
                      .slice(0, 5)
                      .map((game) => ({
                        name: game.title,
                        revenue: game.monthlyRevenue,
                      }))}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={80}
                      tick={{ fontSize: 14 }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${formatLargeNumber(value)}`,
                        "Monthly Revenue",
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="revenue" fill="#9945FF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="reveal-animation">
              <CardHeader>
                <CardTitle>Top Projects by Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={games
                        .filter((game) => game.monthlyActiveUsers)
                        .sort(
                          (a, b) =>
                            (b.monthlyActiveUsers || 0) -
                            (a.monthlyActiveUsers || 0)
                        )
                        .slice(0, 5)
                        .map((game) => ({
                          name: game.title,
                          users: game.monthlyActiveUsers,
                        }))}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={80}
                        tick={{ fontSize: 14 }}
                      />
                      <Tooltip
                        formatter={(value) => [
                          formatLargeNumber(value),
                          "Monthly Active Users",
                        ]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar dataKey="users" fill="#7d37cc" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="reveal-animation">
              <CardHeader>
                <CardTitle>NFT Volume by Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={games
                          .filter((game) => game.nftVolume)
                          .sort(
                            (a, b) => (b.nftVolume || 0) - (a.nftVolume || 0)
                          )
                          .slice(0, 5)
                          .map((game) => ({
                            name: game.title,
                            value: game.nftVolume,
                          }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {games
                          .filter((game) => game.nftVolume)
                          .slice(0, 5)
                          .map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${formatLargeNumber(value)}`,
                          "NFT Volume",
                        ]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tokens Tab */}
        <TabsContent value="tokens" className="space-y-6">
          <Card className="reveal-animation">
            <CardHeader>
              <CardTitle>Top Tokens by Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tokens
                      .sort((a, b) => b.marketCap - a.marketCap)
                      .slice(0, 5)
                      .map((token) => ({
                        name: token.name,
                        marketCap: token.marketCap,
                      }))}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={80}
                      tick={{ fontSize: 14 }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${formatLargeNumber(value)}`,
                        "Market Cap",
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="marketCap" fill="#9945FF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="reveal-animation">
              <CardHeader>
                <CardTitle>Token Price Changes (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tokens
                        .sort((a, b) => b.priceChange24h - a.priceChange24h)
                        .slice(0, 5)
                        .map((token) => ({
                          name: token.name,
                          priceChange: token.priceChange24h,
                        }))}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={80}
                        tick={{ fontSize: 14 }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value.toFixed(2)}%`, "24h Change"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="priceChange"
                        fill="#9945FF"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="reveal-animation">
              <CardHeader>
                <CardTitle>Trading Volume (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={tokens
                          .sort((a, b) => b.volume24h - a.volume24h)
                          .slice(0, 5)
                          .map((token) => ({
                            name: token.name,
                            value: token.volume24h,
                          }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {tokens
                          .sort((a, b) => b.volume24h - a.volume24h)
                          .slice(0, 5)
                          .map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${formatLargeNumber(value)}`,
                          "24h Volume",
                        ]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

export default Analytics;
