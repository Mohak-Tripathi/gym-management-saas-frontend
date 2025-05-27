'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const donutData = [
  { name: '18-26', value: 45, color: '#aacc15' },
  { name: '27-35', value: 25, color: '#90a5fa' },
  { name: '35-43', value: 10, color: '#af4444' },
  { name: 'Above 44', value: 15, color: '#cc4899' },
  { name: 'Below 18', value: 5, color: '#9fee88' },
];

const PieCharts = () => {

  return (
    <div className="w-full h-56 flex flex-col gap-4 md:flex-row">
      {/* Donut chart */}
      <div className="md:w-2/4 relative h-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
            >
              {donutData && donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-[12px] shadow-sm">
                      <p className="text-gray-700 !m-0">

                        {payload && payload.length > 0 && payload[0]?.name && payload[0]?.value !== undefined && (
                          <>
                            {payload[0].name}: <strong>{payload[0].value}</strong>
                          </>
                        )}
                        {/* {payload[0].name}: <strong>{payload[0].value}</strong> */}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* right-side legend */}
      <div className="md:w-2/4 mb-4 md:mb-0 md:pr-4 flex flex-col justify-center gap-2">
        {donutData && donutData.map((item, index) => (
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

export default PieCharts
