import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    progress?: number;
    score?: number;
}

interface ProgressChartProps {
    data: ChartData[];
}

export function ProgressChart({ data }: ProgressChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#8884d8" />
                <Bar dataKey="score" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}