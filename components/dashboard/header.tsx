"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";




type DashboardHeaderProps = {
  apiSecret?: string;
};

export function DashboardHeader({ apiSecret }: DashboardHeaderProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!apiSecret) {
      console.warn("API secret not provided. Some functionalities might not work.");
    }
  }, [apiSecret]);


  const [, setApiSecret] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the API secret from the JSON file
    const fetchApiSecret = async () => {
      try {
        const response = await fetch("/data/dashboard.json");
        if (!response.ok) {
          throw new Error("Failed to load API secret");
        }
        const data = await response.json();
        setApiSecret(data.api_secret);
      } catch (error) {
        console.error("Error fetching API secret:", error);
      }
    };

    fetchApiSecret();
  }, []);

  const handleDownload = async () => {
    if (!apiSecret) {
      alert("API secret is missing!");
      return;
    }

    setIsDownloading(true);

    try {
      const response = await fetch("/api/imgdownload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiSecret }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Download failed: ${errorText}`);
        return;
      }

      const { image } = await response.json();
      if (!image) {
        alert("Image data is missing from the response.");
        return;
      }

      const link = document.createElement("a");
      link.href = `data:image/png;base64,${image}`;
      link.download = "dashboard-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Download successful!");
    } catch (error) {
      console.error("Download error:", error);
      alert("An error occurred during the download.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
          <Select defaultValue="all-time">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All-time</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="People" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="managers">Managers</SelectItem>
              <SelectItem value="employees">Employees</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleDownload}
          disabled={isDownloading || !apiSecret}
          className="w-full sm:w-auto whitespace-nowrap"
        >
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? "Downloading..." : "Download"}
        </Button>
      </div>
    </div>
  );
}




