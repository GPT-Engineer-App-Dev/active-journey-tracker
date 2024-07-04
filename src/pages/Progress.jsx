import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchWorkouts = async () => {
  const response = await fetch("/api/workouts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Progress = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts,
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const labels = data.map((workout) => new Date(workout.date).toLocaleDateString());
      const weights = data.map((workout) => workout.weight);

      setChartData({
        labels,
        datasets: [
          {
            label: "Weight Lifted (kg)",
            data: weights,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      });
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton className="w-full h-64" />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData ? (
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <div>No data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;