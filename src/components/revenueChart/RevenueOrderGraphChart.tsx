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
    { hour: 1, revenue: 4,  },
    { hour: 2, revenue: 5,  },
    { hour: 4, revenue: 4.2, },
    { hour: 6, revenue: 3.8, },
    { hour: 8, revenue: 3.5, },
    { hour: 10, revenue: 4.3, },
    { hour: 12, revenue: 4.9, },
    { hour: 14, revenue: 3.7, },
    { hour: 16, revenue: 4.4, },
    { hour: 18, revenue: 3.9, },
    { hour: 20, revenue: 4.6,},
    { hour: 22, revenue: 4.4,  },
    { hour: 24, revenue: 3.9,  },
];

const RevenueOrderGraphChart = () => {
    return (
        <div className="flex gap-8 items-center">
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="ContactedcolorFillOrder" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3EAF3F" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3EAF3F" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis
                        dataKey="hour"
                        label={{
                            value: 'Hours',
                            position: 'insideBottom',
                            offset: -5,
                            fontSize: 10,
                        }}
                        tick={{ fontSize: 10 }}
                    />

                    <YAxis
                        label={{
                            value: 'Value',
                            angle: -90,
                            position: 'insideLeft',
                            offset: 10,
                            fontSize: 10,
                        }}
                        tick={{ fontSize: 10 }}
                    />

                    <Tooltip
                        formatter={(value: number, name: string) => {
                            if (name === 'revenue') return [`₹${value}`, 'Revenue'];
                            return [value, name];
                        }}
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

                    {/* Revenue Line and Area */}
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3EAF3F"
                        fill="url(#ContactedcolorFillOrder)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3EAF3F"
                        strokeWidth={2}
                        dot={false}
                    />

                </AreaChart>
            </ResponsiveContainer>

        </div>
    );
};

export default RevenueOrderGraphChart;
