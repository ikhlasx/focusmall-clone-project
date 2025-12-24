"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Home, Plus, LogOut, TrendingUp, Users, Briefcase, Calendar, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface Stats {
  rooms: {
    total: number;
    vacant: number;
    rented: number;
    businessCentre: number;
  };
  events: {
    total: number;
    published: number;
    draft: number;
  };
  gallery: {
    total: number;
    visible: number;
    hidden: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    setUser(user);
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-medium-gray">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-dark-navy">EMALL Admin Panel</h1>
                <p className="text-sm text-medium-gray">Room Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-medium-gray">{user?.email}</span>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Total Rooms
              </CardTitle>
              <Home className="w-4 h-4 text-medium-gray" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dark-navy">
                {stats?.rooms?.total || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Vacant Rooms
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats?.rooms?.vacant || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Rented Rooms
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats?.rooms?.rented || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Business Centre
              </CardTitle>
              <Briefcase className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats?.rooms?.businessCentre || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events & Gallery Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Total Events
              </CardTitle>
              <Calendar className="w-4 h-4 text-medium-gray" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dark-navy">
                {stats?.events?.total || 0}
              </div>
              <div className="text-xs text-medium-gray mt-1">
                {stats?.events?.published || 0} published, {stats?.events?.draft || 0} draft
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Published Events
              </CardTitle>
              <Calendar className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats?.events?.published || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Total Gallery Images
              </CardTitle>
              <ImageIcon className="w-4 h-4 text-medium-gray" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dark-navy">
                {stats?.gallery?.total || 0}
              </div>
              <div className="text-xs text-medium-gray mt-1">
                {stats?.gallery?.visible || 0} visible, {stats?.gallery?.hidden || 0} hidden
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medium-gray">
                Visible Gallery
              </CardTitle>
              <ImageIcon className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats?.gallery?.visible || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/admin/rooms">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Manage Rooms
            </Button>
          </Link>
          <Link href="/admin/rooms/new">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add New Room
            </Button>
          </Link>
          <Link href="/admin/events">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Manage Events
            </Button>
          </Link>
          <Link href="/admin/gallery">
            <Button variant="outline">
              <ImageIcon className="w-4 h-4 mr-2" />
              Manage Gallery
            </Button>
          </Link>
        </div>

        {/* Recent Activity or Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-medium-gray">
                • View and manage all rooms, events, and gallery items
              </p>
              <p className="text-medium-gray">
                • Add new content with images using Cloudinary
              </p>
              <p className="text-medium-gray">
                • Toggle status (rooms: vacant/rented, events: published/draft, gallery: visible/hidden)
              </p>
              <p className="text-medium-gray">
                • All changes reflect immediately on the public website
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


