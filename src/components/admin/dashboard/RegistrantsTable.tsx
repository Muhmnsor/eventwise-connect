import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface RegistrantStats {
  name: string;
  attendedActivities: number;
  totalActivities: number;
  attendancePercentage: number;
}

interface RegistrantsTableProps {
  registrantsStats: RegistrantStats[];
  isLoading: boolean;
}

export const RegistrantsTable = ({ registrantsStats, isLoading }: RegistrantsTableProps) => {
  console.log('RegistrantsTable - stats:', registrantsStats);
  
  if (isLoading) {
    return <div className="text-center py-4">جاري التحميل...</div>;
  }

  if (!registrantsStats?.length) {
    return <div className="text-center py-4">لا يوجد مسجلين في هذا المشروع</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4 text-right">قائمة المسجلين وإحصائيات الحضور</h3>
      <Table dir="rtl">
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right">الأنشطة المحضورة</TableHead>
            <TableHead className="text-right">نسبة الحضور</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrantsStats.map((registrant: RegistrantStats) => (
            <TableRow 
              key={registrant.name}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <TableCell>{registrant.name}</TableCell>
              <TableCell>
                {registrant.attendedActivities} من {registrant.totalActivities}
              </TableCell>
              <TableCell className="w-[200px]">
                <div className="flex items-center gap-2">
                  <Progress value={registrant.attendancePercentage} className="h-2" />
                  <span className="text-sm text-gray-500">
                    {Math.round(registrant.attendancePercentage)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};