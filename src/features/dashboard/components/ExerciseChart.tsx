// components/ExerciseChart.tsx
import { fetchTrainingDataList } from '@/features/training/services/fetchTrainingDataList';
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

type SetData = {
    weight: string;
    reps: string;
};

type Exercise = {
    name: string;
    sets: SetData[];
};

type Training = {
    id: string;
    userId: string;
    trainingDay: string;
    exercises: Exercise[];
};

type TrainingListResponse = {
    trainings: Training[];
};

interface ExerciseChartProps {
    userId: string;
    year: string;
    month: string;
    exerciseName: string;
}

const ExerciseChart: React.FC<ExerciseChartProps> = ({
    userId,
    year,
    month,
    exerciseName,
}) => {
    // チャート用データ：各トレーニング日の最大重量
    const [chartData, setChartData] = useState<
        Array<{ trainingDay: string; maxWeight: number }>
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const json = await fetchTrainingDataList(userId, year, month) as TrainingListResponse;
                if (!json) return;

                // 各トレーニングから指定エクササイズの最大重量を抽出
                const data = json.trainings
                    .map((training) => {
                        const exercise = training.exercises.find(
                            (ex) => ex.name === exerciseName
                        );
                        if (!exercise) return null;
                        const maxWeight = Math.max(
                            ...exercise.sets.map((set) => parseFloat(set.weight))
                        );
                        return { trainingDay: training.trainingDay, maxWeight };
                    })
                    .filter(
                        (item): item is { trainingDay: string; maxWeight: number } =>
                            item !== null
                    );
                setChartData(data);
            } catch (error) {
                console.error('Error fetching training data:', error);
            }
        };

        fetchData();
    }, [userId, year, month, exerciseName]);

    return (
        <div>
            {/* <h2>{exerciseName} の重量推移</h2> */}
            <ResponsiveContainer width="100%" height={250}>
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

export default ExerciseChart;
