import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { DepartmentsList } from "@/components/tasks/DepartmentsList";

const Tasks = () => {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <TopHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-primary">الإدارات والوحدات</h1>
          <DepartmentsList />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tasks;