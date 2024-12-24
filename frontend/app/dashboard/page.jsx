'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Home, Users, Boxes, Activity, UserCircle, Plus, Search, CalendarRange } from 'lucide-react';
import { format, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';

const sidebarItems = [
  
];

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project Alpha', createdAt: '2024-12-20', createdBy: 'John Doe' },
    { id: 2, name: 'Project Beta', createdAt: '2024-12-22', createdBy: 'Jane Smith' },
  ]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const filteredProjects = projects.filter(project => {
    const projectDate = new Date(project.createdAt);
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDateRange = !dateRange.from || !dateRange.to || 
      isWithinInterval(projectDate, {
        start: dateRange.from,
        end: dateRange.to
      });
    
    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Projects</h1>
            
            {user.designation === 'L3' && (
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[300px] justify-start">
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {(dateRange.from || dateRange.to) && (
              <Button 
                variant="ghost" 
                onClick={() => setDateRange({ from: null, to: null })}
              >
                Clear Dates
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Created on: {format(new Date(project.createdAt), "PPP")}</div>
                    <div>Created by: {project.createdBy}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}