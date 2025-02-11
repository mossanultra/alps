// components/TotalWeightChart.tsx
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

interface TotalWeightChartProps {
    userId: string;
    year: string;
    month: string;
}

const TotalWeightChart: React.FC<TotalWeightChartProps> = ({ userId, year, month }) => {
    // チャート用データ：各トレーニング日の総重量
    const [chartData, setChartData] = useState<
        Array<{ trainingDay: string; totalWeight: number }>
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/training/list?userId=${userId}&year=${year}&month=${month}`
                );
                const json: TrainingListResponse = await res.json();

                // 各トレーニングの全セットについて、重量×レップ数の合計を計算
                const data = json.trainings.map((training) => {
                    let totalWeight = 0;
                    training.exercises.forEach((exercise) => {
                        exercise.sets.forEach((set) => {
                            const weight = parseFloat(set.weight);
                            const reps = parseFloat(set.reps);
                            totalWeight += weight * reps;
                        });
                    });
                    return { trainingDay: training.trainingDay, totalWeight };
                });
                setChartData(data);
            } catch (error) {
                console.error('Error fetching training data:', error);
            }
        };

        fetchData();
    }, [userId, year, month]);

    return (
        <div>
            {/* <h2>全トレーニングの総重量推移</h2> */}
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="trainingDay" />
                    <YAxis label={{ value: '総重量', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalWeight" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalWeightChart;
