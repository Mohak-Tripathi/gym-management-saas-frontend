'use client';

import {
    AreaChart,
    Area,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const data = [
    { hour: 1, value: 1.2 },
    { hour: 4, value: 1.5 },
    { hour: 8, value: 3.8 },
    { hour: 12, value: 2.1 },
    { hour: 16, value: 2.9 },
    { hour: 20, value: 2.4 },
    { hour: 24, value: 1.3 },
];

const GraphChart = () => {
    return (
        <div className="">
            <ResponsiveContainer width="60%" height={250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#facc15" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis
                        dataKey="hour"
                        label={{
                            value: 'Days',
                            position: 'insideBottom',
                            offset: -5,
                            fontSize: 10,
                        }}
                        tick={{ fontSize: 10 }}
                    />

                    <YAxis
                        label={{
                            value: 'Duration',
                            angle: -90,
                            position: 'insideLeft',
                            offset: 10,
                            fontSize: 10,
                        }}
                        tick={{ fontSize: 10 }}
                    />

                    <Tooltip
                        formatter={(value) => `₹${value}`}
                        contentStyle={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            borderRadius: '4px',
                        }}
                        itemStyle={{
                            fontSize: '12px',
                            margin: 0,
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        fill="url(#colorFill)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraphChart
