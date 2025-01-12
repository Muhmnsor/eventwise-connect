import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { TopHeader } from '@/components/layout/TopHeader';
import { Footer } from '@/components/layout/Footer';
import { Progress } from '@/components/ui/progress';

const PortfolioWorkspaceDetails = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const { data: workspace, isLoading, error } = useQuery({
    queryKey: ['portfolio-workspace', workspaceId],
    queryFn: async () => {
      console.log('Fetching workspace details for ID:', workspaceId);
      
      const { data: workspaceData, error: fetchError } = await supabase
        .functions.invoke('get-workspace', {
          body: { workspaceId }
        });

      if (fetchError) {
        console.error('Error fetching workspace:', fetchError);
        throw new Error(fetchError.message || 'حدث خطأ أثناء تحميل بيانات مساحة العمل');
      }

      console.log('Successfully fetched workspace data:', workspaceData);
      return workspaceData;
    },
    retry: 1,
    meta: {
      errorMessage: 'حدث خطأ أثناء تحميل بيانات مساحة العمل'
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopHeader />
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="p-4 space-y-4" dir="rtl">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !workspace) {
    toast.error('حدث خطأ أثناء تحميل بيانات مساحة العمل');
    return (
      <div className="min-h-screen flex flex-col">
        <TopHeader />
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center" dir="rtl">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                لم يتم العثور على مساحة العمل
              </h2>
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                العودة
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{workspace.name}</h1>
              <Button 
                onClick={() => {}} // Will implement task creation dialog later
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                إضافة مهمة
              </Button>
            </div>

            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-2">الوصف</h2>
              <p className="text-gray-600 mb-4">
                {workspace.description || 'لا يوجد وصف'}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>تقدم المهام</span>
                  <span>{workspace.tasks ? Math.round((workspace.tasks.filter(task => task.status === 'completed').length / workspace.tasks.length) * 100) : 0}%</span>
                </div>
                <Progress value={workspace.tasks ? Math.round((workspace.tasks.filter(task => task.status === 'completed').length / workspace.tasks.length) * 100) : 0} className="h-2" />
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">المهام</h2>
              {workspace.tasks?.length > 0 ? (
                <div className="grid gap-4">
                  {workspace.tasks.map((task) => (
                    <Card key={task.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">
                            {task.description || 'لا يوجد وصف'}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          task.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">لا توجد مهام في مساحة العمل هذه</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioWorkspaceDetails;