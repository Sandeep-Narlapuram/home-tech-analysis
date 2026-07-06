
import { useRef, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Sample data for previous year's trending products (now includes both electronics and fashion)
const previousTrending = [
  {
    id: 101,
    title: "Smart 4K TV 55\"",
    category: "Television",
    year: 2023,
    salesUnits: 1253,
    revenue: 1879500,
    growthRate: 24,
    image: "https://images.unsplash.com/photo-1593784991095-a205069533cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 102,
    title: "Wireless Noise-Cancelling Headphones",
    category: "Audio",
    year: 2023,
    salesUnits: 982,
    revenue: 982000,
    growthRate: -5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 1,
    title: "Oversized Cotton Shirt",
    category: "Fashion - Tops",
    year: 2023,
    salesUnits: 895,
    revenue: 805455,
    growthRate: 18,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 103,
    title: "Smart Home Assistant",
    category: "Smart Home",
    year: 2023,
    salesUnits: 745,
    revenue: 1117500,
    growthRate: 17,
    image: "https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
  },
  {
    id: 3,
    title: "Minimalist Leather Jacket",
    category: "Fashion - Outerwear",
    year: 2023,
    salesUnits: 712,
    revenue: 778000,
    growthRate: 22,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
  },
  {
    id: 105,
    title: "Smartphone Pro Max",
    category: "Smartphone",
    year: 2023,
    salesUnits: 892,
    revenue: 892000,
    growthRate: 31,
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 6,
    title: "Linen Summer Dress",
    category: "Fashion - Dresses",
    year: 2023,
    salesUnits: 687,
    revenue: 1030365,
    growthRate: 20,
    image: "https://images.unsplash.com/photo-1624835567150-0c530a20d8cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
];

// Chart data by month with home electronics categories
const monthlySalesData = [
  { month: 'Jan', smartphones: 120, televisions: 85, audioDevices: 45, smartHome: 32 },
  { month: 'Feb', smartphones: 132, televisions: 74, audioDevices: 56, smartHome: 38 },
  { month: 'Mar', smartphones: 141, televisions: 94, audioDevices: 59, smartHome: 42 },
  { month: 'Apr', smartphones: 154, televisions: 98, audioDevices: 63, smartHome: 48 },
  { month: 'May', smartphones: 163, televisions: 115, audioDevices: 68, smartHome: 54 },
  { month: 'Jun', smartphones: 172, televisions: 125, audioDevices: 72, smartHome: 60 },
  { month: 'Jul', smartphones: 189, televisions: 132, audioDevices: 75, smartHome: 68 },
  { month: 'Aug', smartphones: 185, televisions: 142, audioDevices: 82, smartHome: 75 },
  { month: 'Sep', smartphones: 176, televisions: 132, audioDevices: 98, smartHome: 82 },
  { month: 'Oct', smartphones: 154, televisions: 124, audioDevices: 110, smartHome: 88 },
  { month: 'Nov', smartphones: 150, televisions: 101, audioDevices: 125, smartHome: 92 },
  { month: 'Dec', smartphones: 162, televisions: 95, audioDevices: 138, smartHome: 98 }
];

const chartConfig = {
  smartphones: { label: "Smartphones", theme: { light: "#3b82f6", dark: "#60a5fa" } },
  televisions: { label: "Televisions", theme: { light: "#ec4899", dark: "#f472b6" } },
  audioDevices: { label: "Audio Devices", theme: { light: "#10b981", dark: "#34d399" } },
  smartHome: { label: "Smart Home", theme: { light: "#f59e0b", dark: "#fbbf24" } }
};

// Summary stats
const summaryStats = [
  { title: "Total Revenue", value: "₹8,484,820", change: "+15% from 2022" },
  { title: "Units Sold", value: "6,166", change: "+12% from 2022" },
  { title: "Avg. Order Value", value: "₹1,376", change: "+3% from 2022" },
  { title: "Conversion Rate", value: "4.2%", change: "+0.7% from 2022" }
];

const Dashboard = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="dashboard" className="py-20 bg-muted/30" ref={sectionRef}>
      <div className="section-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="inline-block text-sm font-medium text-muted-foreground mb-3">
            Past Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            2023 Home Tech & Fashion Insights
          </h2>
          <p className="text-muted-foreground">
            A comprehensive look at our bestselling electronics and fashion products with category performance from last year
          </p>
        </div>

        {/* Summary stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {summaryStats.map((stat, index) => (
            <div 
              key={stat.title} 
              className="bg-background rounded-xl p-6 shadow-sm border border-border/50"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease, transform 0.5s ease`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-xs flex items-center mt-2 ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change.includes('+') ? (
                  <ArrowUp size={12} className="mr-1" />
                ) : (
                  <ArrowDown size={12} className="mr-1" />
                )}
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Sales chart */}
        <div 
          className="bg-background rounded-xl p-6 shadow-sm border border-border/50 mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            transitionDelay: '0.4s'
          }}
        >
          <h3 className="text-lg font-medium mb-6">Monthly Electronics Sales by Category (2023)</h3>
          <div className="h-[350px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="smartphones" name="smartphones" radius={[4, 4, 0, 0]} />
                <Bar dataKey="televisions" name="televisions" radius={[4, 4, 0, 0]} />
                <Bar dataKey="audioDevices" name="audioDevices" radius={[4, 4, 0, 0]} />
                <Bar dataKey="smartHome" name="smartHome" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        {/* Top products table */}
        <div 
          className="bg-background rounded-xl p-6 shadow-sm border border-border/50"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            transitionDelay: '0.5s'
          }}
        >
          <h3 className="text-lg font-medium mb-6">Top Selling Products (2023)</h3>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Units Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previousTrending.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-secondary">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{product.title}</span>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.salesUnits.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{product.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center ${product.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {product.growthRate > 0 ? (
                          <ArrowUp size={14} className="mr-1" />
                        ) : (
                          <ArrowDown size={14} className="mr-1" />
                        )}
                        {Math.abs(product.growthRate)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
