'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const donutData = [
  { name: 'New Visitors Per Week', value: 45, color: '#facc15' },
  { name: 'Visitors Per Week', value: 25, color: '#60a5fa' },
  { name: 'On Hold', value: 10, color: '#ef4444' },
  { name: 'Not Visiting', value: 15, color: '#ec4899' },
  { name: 'Visitors per week', value: 5, color: '#10b981' },
];

const DonutChart = () => {

  const total = donutData.reduce((acc, cur) => acc + cur.value, 0);
  const centerPercentage = Math.round((total / 100) * 85); // mimic "85% April"

  return (
    <div className="w-full h-56 flex flex-col gap-4 md:flex-row">
      {/* Donut chart */}
      <div className="md:w-2/4 relative h-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-[12px] shadow-sm">
                      <p className="text-gray-700 !m-0">
                        {payload[0].name}: <strong>{payload[0].value}</strong>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-bold">85%</div>
          <div className="text-sm text-gray-500">April</div>
        </div>
      </div>

      {/* right-side legend */}
      <div className="md:w-2/4 mb-4 md:mb-0 md:pr-4 flex flex-col justify-center gap-2">
        {donutData.map((item, index) => (
          <div key={index} className="flex items-center text-[14px] gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DonutChart
