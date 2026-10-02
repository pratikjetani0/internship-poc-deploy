import Layout from "../layout/Layout";
import { getTaskStats } from "../utils/taskStats";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Task } from "../types";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import SummaryCard from "../components/SummaryCard";
import StatusPieChart from "../components/charts/StatusPieChart";
import {
  getCategoryChartData,
  getPriorityChartData,
  getStatusChartData,
} from "../utils/analyticsData";
import PriorityBarChart from "../components/charts/PriorityBarChart";
import CategoryBarChart from "../components/charts/CategoryBarChart";

const AnalyticsPage = () => {
  const [tasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, []);

  const { total, completed, pending, overdue } = getTaskStats(tasks);

  const statusData = getStatusChartData(tasks);
  const priorityData = getPriorityChartData(tasks);
  const categoryData = getCategoryChartData(tasks);

  return (
    <Layout>
      <div className="p-6 space-y-4">

         <h1 className="mt-1 text-2xl font-bold tracking-tight text-violet-600 dark:text-violet-400 sm:text-3xl">
          Analytics 
        </h1>
        {/* Summary section  */}
         <div className="border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent rounded-2xl p-5">
          <p className="text-xs text-slate-500 dark:text-white/30 uppercase tracking-widest mb-4">
            Summary
          </p>

          <div className="grid grid-cols-2 gap-4">
            <SummaryCard title="Total Tasks" count={total} />
            <SummaryCard title="Completed" count={completed} />
            <SummaryCard title="Pending" count={pending} />
            <SummaryCard title="Overdue" count={overdue} />
          </div>
        </div>


        {/* Charts  */}

        <div className="border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent rounded-2xl p-5">
          <p className="text-xs text-slate-500 dark:text-white/30 uppercase tracking-widest mb-6">
            Charts
          </p>

          {tasks.length === 0 ? (
            <div className="py-20 text-center text-slate-400 dark:text-white/20 text-sm">
              No task data yet. Add tasks on the Dashboard.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Completion Status */}
              <StatusPieChart data={statusData} />

              {/* Priority Distribution */}
              <PriorityBarChart data={priorityData} />

              {/* Category */}
              <CategoryBarChart data={categoryData} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
