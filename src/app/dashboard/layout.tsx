import React from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { AIAssistant } from "@/components/ai-assistant/ai-assistant";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-secondary/10 to-transparent" />
      </div>

      <DashboardSidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-6 lg:p-8">{children}</main>
      </div>

      {/* AI Assistant Widget */}
      <AIAssistant />
    </div>
  );
}
