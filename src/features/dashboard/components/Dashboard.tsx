// components/Dashboard.tsx
'use client';
import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ExerciseChart from './ExerciseChart';
import TotalWeightChart from './TotalWeightChart';
import { fetchTrainingDataList } from '@/features/training/services/fetchTrainingDataList';
import { TrainingListResponse } from '@/features/training/types/training';
import { useSession } from 'next-auth/react';

type BoardType = 'exercise' | 'total';

type Board = {
    id: string;
    type: BoardType;
    // exercise ボードの場合、表示するエクササイズ名を保持
    exercise?: string;
};

const Dashboard: React.FC = () => {
    const { data: session } = useSession()
    // 初期状態として、全重量表示のボードとエクササイズボード１件を用意
    const initialBoards: Board[] = [
        { id: 'total-weight', type: 'total' },
        { id: 'exercise-1', type: 'exercise', exercise: 'レッグ プレス' },
    ];
    const [boards, setBoards] = useState<Board[]>(initialBoards);
    const[availableExercises , setAvailableExercises] = useState<string[]>([]);
    

    useEffect(() => {
        if(!session) return;

        const fetchData = async () => {
            try {
                const json = await fetchTrainingDataList(session.user!.id!, "2025", "02") as TrainingListResponse;
                if (!json) return;

                // jsonからnameのみ取り出す
                const exercises = json.trainings.map((training) => {
                    return training.exercises.map((ex) => ex.name);
                }).flat();
                setAvailableExercises([...new Set(exercises)]);
            } catch (error) {
                console.error('Error fetching training data:', error);
            }
        };

        fetchData();
    }, [session]);

    // エクササイズボードの追加
    const addExerciseBoard = () => {
        const newId = `exercise-${Date.now()}`;
        const newBoard: Board = { id: newId, type: 'exercise', exercise: availableExercises[0] };
        setBoards([...boards, newBoard]);
    };

    // ボード削除
    const removeBoard = (id: string) => {
        console.log('remove board:', id);
        setBoards(boards.filter((board) => board.id !== id));
    };

    // ボード内のエクササイズ変更
    const onExerciseChange = (id: string, newExercise: string) => {
        setBoards(
            boards.map((board) =>
                board.id === id ? { ...board, exercise: newExercise } : board
            )
        );
    };

    // react-grid-layout 用の layout 情報（各ボードの位置とサイズ）
    const layout = boards.map((board, index) => ({
        i: board.id,
        // シンプルな配置例。必要に応じて調整してください
        x: (index * 4) % 12,
        y: Math.floor(index / 3) * 4,
        w: 4,
        h: 4,
    }));

    return (
        <div>
            <h1>トレーニングダッシュボード</h1>
            <button onClick={addExerciseBoard}>エクササイズボード追加</button>
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={80}
                width={1200}
                draggableCancel="button,select"
            >
                {boards.map((board) => (
                    <div
                        key={board.id}
                        style={{
                            border: '1px solid #ccc',
                            background: '#fff',
                            padding: '8px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <span style={{ color: 'black' }}>
                                {board.type === 'total' ? '全重量' : board.exercise}
                            </span>
                            <button onClick={() => removeBoard(board.id)}>削除</button>
                        </div>
                        {board.type === 'exercise' && (
                            <>
                                <select
                                    value={board.exercise}
                                    onChange={(e) => onExerciseChange(board.id, e.target.value)}
                                >
                                    {availableExercises.map((ex) => (
                                        <option key={ex} value={ex}>
                                            {ex}
                                        </option>
                                    ))}
                                </select>
                                <ExerciseChart
                                    userId="PeVnUTf4wMaeMwUXtkH2F8Alswg1"
                                    year="2025"
                                    month="02"
                                    exerciseName={board.exercise || availableExercises[0]}
                                />
                            </>
                        )}
                        {board.type === 'total' && (
                            <TotalWeightChart
                                userId="PeVnUTf4wMaeMwUXtkH2F8Alswg1"
                                year="2025"
                                month="02"
                            />
                        )}
                    </div>
                ))}
            </GridLayout>
        </div>
    );
};

export default Dashboard;
