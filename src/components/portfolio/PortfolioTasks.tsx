import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ListChecks, Calendar, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AddTaskDialog } from './tasks/AddTaskDialog';

export const PortfolioTasks = ({ workspaceId }: { workspaceId: string }) => {
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

  const { data: tasks, isLoading, refetch } = useQuery({
    queryKey: ['portfolio-tasks', workspaceId],
    queryFn: async () => {
      console.log('Fetching tasks for workspace:', workspaceId);
      
      // First get the workspace UUID from Asana GID
      const { data: workspace, error: workspaceError } = await supabase
        .from('portfolio_workspaces')
        .select('id')
        .eq('asana_gid', workspaceId)
        .single();

      if (workspaceError) {
        console.error('Error fetching workspace:', workspaceError);
        throw workspaceError;
      }

      if (!workspace) {
        console.error('Workspace not found');
        return [];
      }

      const { data, error } = await supabase
        .from('portfolio_tasks')
        .select(`
          *,
          assigned_to (
            email
          )
        `)
        .eq('workspace_id', workspace.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

      console.log('Fetched tasks:', data);
      return data;
    }
  });

  const handleTaskAdded = async () => {
    await refetch();
  };

  if (isLoading) {
    return <div className="p-4">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">المهام</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsAddTaskDialogOpen(true)}
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة مهمة
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks?.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                <span className="font-medium">{task.title}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {task.due_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(task.due_date).toLocaleDateString('ar-SA')}</span>
                  </div>
                )}
                {task.assigned_to && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{task.assigned_to.email}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddTaskDialog
        open={isAddTaskDialogOpen}
        onOpenChange={setIsAddTaskDialogOpen}
        workspaceId={workspaceId}
        onSuccess={handleTaskAdded}
      />
    </div>
  );
};