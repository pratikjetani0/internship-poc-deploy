interface SummaryCardProps {
  title: string;
  count: number;
}

const SummaryCard = ({ title, count }: SummaryCardProps) => {
  return (
    <div className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm dark:shadow-none">
      <p className="text-xs text-slate-500 dark:text-white/40 mb-2">{title}</p>

      <p className="text-4xl font-bold text-slate-900 dark:text-white">
        {count}
      </p>
    </div>
  );
};

export default SummaryCard;
