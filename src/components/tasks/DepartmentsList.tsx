import { Department } from "@/types/department";
import { DepartmentCard } from "./DepartmentCard";

interface DepartmentsListProps {
  departments: Department[];
}

export const DepartmentsList = ({ departments }: DepartmentsListProps) => {
  if (!departments.length) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">لا توجد إدارات مضافة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {departments.map((department) => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </div>
  );
};