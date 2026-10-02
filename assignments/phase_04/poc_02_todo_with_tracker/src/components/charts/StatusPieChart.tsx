import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const StatusPieChart = ({ data }: Props) => {
  return (
    <div className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm dark:shadow-none">
      <p className="text-xs text-slate-500 dark:text-white/40 mb-4">
        Completion Status
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
          />

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
