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
    { hour: 1, revenue: 1.2, subscriptions: 3 },
    { hour: 4, revenue: 5, subscriptions: 4 },
    { hour: 8, revenue: 3.8, subscriptions: 5 },
    { hour: 12, revenue: 2.1, subscriptions: 4 },
    { hour: 16, revenue: 7, subscriptions: 6 },
    { hour: 20, revenue: 2.4, subscriptions: 5 },
    { hour: 24, revenue: 1.3, subscriptions: 4 },
];

const GraphChart = () => {
    return (
        <div className="flex gap-8 items-center">
            <ResponsiveContainer width="70%" height={250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorFillRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFC130" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#FFC130" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorFillSubscriptions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8C25FC" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#8C25FC" stopOpacity={0} />
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
                            if (name === 'subscriptions') return [`${value}`, 'Subscriptions'];
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
                        stroke="#FFC130"
                        fill="url(#colorFillRevenue)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={false}
                    />

                    {/* Subscriptions Line and Area */}
                    <Area
                        type="monotone"
                        dataKey="subscriptions"
                        stroke="#8C25FC"
                        fill="url(#colorFillSubscriptions)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="subscriptions"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <p className="text-[20px] text-black-primary leading-[100%] font-semibold !m-0">
                            ₹78,334
                        </p>
                        <p className="text-[12px] text-black-primary leading-[100%] font-normal !m-0 p-1 rounded-[8px] bg-green-mint">
                            +2.3%
                        </p>
                    </div>
                    <p className="text-[12px] text-black-60 leading-[100%] font-normal !m-0">Revenue</p>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <p className="text-[20px] text-black-primary leading-[100%] font-semibold !m-0">
                            312
                        </p>
                        <p className="text-[12px] text-black-primary leading-[100%] font-normal !m-0 p-1 rounded-[8px] bg-green-mint">
                            +4.4%
                        </p>
                    </div>
                    <p className="text-[12px] text-black-60 leading-[100%] font-normal !m-0">Subscriptions</p>
                </div>
            </div>
        </div>
    );
};

export default GraphChart;
