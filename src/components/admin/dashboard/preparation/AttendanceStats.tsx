import { FC } from "react";

interface AttendanceStatsProps {
  stats: {
    total: number;
    present: number;
    absent: number;
    notRecorded: number;
  };
}

export const AttendanceStats: FC<AttendanceStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-500">إجمالي المسجلين</div>
        <div className="text-2xl font-semibold">{stats.total}</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="text-sm text-green-600">الحضور</div>
        <div className="text-2xl font-semibold text-green-600">{stats.present}</div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="text-sm text-red-600">الغياب</div>
        <div className="text-2xl font-semibold text-red-600">{stats.absent}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-500">لم يتم التحضير</div>
        <div className="text-2xl font-semibold">{stats.notRecorded}</div>
      </div>
    </div>
  );
};