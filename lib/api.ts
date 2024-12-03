import { DashboardData, DownloadResponse } from './types/api';

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const response = await fetch('/data/dashboard.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to load dashboard data. Please try again later.');
  }
}

