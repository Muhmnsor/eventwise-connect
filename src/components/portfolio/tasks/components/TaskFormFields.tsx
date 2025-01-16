import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TaskFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  assignedTo: string;
  setAssignedTo: (value: string) => void;
}

export const TaskFormFields = ({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  priority,
  setPriority,
  assignedTo,
  setAssignedTo
}: TaskFormFieldsProps) => {
  // Fetch users from profiles table
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      console.log('Fetching profiles for task assignment...');
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email');
      
      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }
      
      console.log('Fetched profiles:', data);
      return data || [];
    }
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>عنوان المهمة</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان المهمة"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>الوصف</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل وصف المهمة"
          className="h-32"
        />
      </div>

      <div className="space-y-2">
        <Label>تاريخ الاستحقاق</Label>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>المسؤول</Label>
        <Select value={assignedTo} onValueChange={setAssignedTo}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المسؤول" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>الأولوية</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الأولوية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">منخفضة</SelectItem>
            <SelectItem value="medium">متوسطة</SelectItem>
            <SelectItem value="high">عالية</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};