import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import ThemeToggle from "../../components/common/ThemeToggle"; // ThemeToggle इम्पोर्ट केले
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      
      {/* Theme Toggle - Top Right Position */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Card
        title="Welcome"
        subtitle="Income Expense Tracker"
        headerAction={null}
        // dark mode साठी क्लासेस ॲड केले आहेत
        className="w-full max-w-[450px] shadow-2xl border-none rounded-3xl bg-white dark:bg-gray-800 p-4 transition-colors duration-300"
        footer={
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Track your daily income and expenses easily.
          </p>
        }
      >
        <div className="flex flex-col gap-4 mt-8">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-[0.98]"
          >
            <LogIn size={20} />
            Login Page
          </Link>

          <Link
            to="/register"
            className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 dark:shadow-none transition-all active:scale-[0.98]"
          >
            <UserPlus size={20} />
            Register Page
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Index;