// TrainingChart.tsx
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrainingListResponse } from '../../types/training';


interface TrainingChartProps {
  userId: string;
  year: string;
  month: string;
  exerciseName: string;
}

const TrainingChart: React.FC<TrainingChartProps> = ({ userId, year, month, exerciseName }) => {
  const [chartData, setChartData] = useState<Array<{ trainingDay: string; maxWeight: number }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/training/list?userId=${userId}&year=${year}&month=${month}`
        );
        const json: TrainingListResponse = await res.json();
        const data = json.trainings.map((training) => {
          const exercise = training.exercises.find((ex) => ex.name === exerciseName);
          if (!exercise) return null;
          const maxWeight = Math.max(...exercise.sets.map((set) => parseFloat(set.weight)));
          return {
            trainingDay: training.trainingDay,
            maxWeight,
          };
        }).filter((item): item is { trainingDay: string; maxWeight: number } => item !== null);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching training data:', error);
      }
    };

    fetchData();
  }, [userId, year, month, exerciseName]);

  return (
    <div>
      <h2>{exerciseName} の最大重量推移</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trainingDay" />
          <YAxis label={{ value: '重量', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="maxWeight" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ここでコンポーネントをエクスポート
export default TrainingChart;
