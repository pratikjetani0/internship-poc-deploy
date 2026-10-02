import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

const PriorityBarChart = ({ data }: Props) => {
  return (
    <div className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/8 rounded-2xl p-5 shadow-sm dark:shadow-none">
      <p className="text-xs text-slate-500 dark:text-white/40 mb-4">
        Tasks by Priority
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={36}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityBarChart;
