import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 dark:bg-[#0f0f0f]">
      {/* 404 Text */}
      <h1 className="text-7xl font-extrabold text-violet-600">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-center text-sm text-slate-500 dark:text-white/50">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;