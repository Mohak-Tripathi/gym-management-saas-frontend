import { ResponsiveContainer, ScatterChart, XAxis, YAxis, ZAxis, Tooltip, Scatter } from 'recharts';

const data = [
  { x: 10, y: 30, z: 200, name: 'Group A' },
  { x: 20, y: 20, z: 300, name: 'Group B' },
  { x: 30, y: 50, z: 400, name: 'Group C' },
  { x: 40, y: 60, z: 100, name: 'Group D' },
];

const BubbleChart = () => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <XAxis dataKey="x" name="X" />
          <YAxis dataKey="y" name="Y" />
          <ZAxis dataKey="z" range={[60, 400]} name="Size" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Bubbles" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BubbleChart
