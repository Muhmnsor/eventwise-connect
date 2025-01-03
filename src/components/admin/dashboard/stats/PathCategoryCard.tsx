import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PathCategoryCardProps {
  projectId: string;
}

export const PathCategoryCard = ({ projectId }: PathCategoryCardProps) => {
  const { data: averageRating = 0 } = useQuery({
    queryKey: ['project-average-rating', projectId],
    queryFn: async () => {
      console.log('Fetching average rating for project:', projectId);
      
      const { data: activities } = await supabase
        .from('events')
        .select(`
          id,
          event_feedback (
            overall_rating,
            content_rating,
            organization_rating,
            presenter_rating
          )
        `)
        .eq('project_id', projectId)
        .eq('is_project_activity', true);

      if (!activities?.length) {
        console.log('No activities found with feedback');
        return 0;
      }

      let totalRating = 0;
      let ratingCount = 0;

      activities.forEach(activity => {
        activity.event_feedback.forEach((feedback: any) => {
          const ratings = [
            feedback.overall_rating,
            feedback.content_rating,
            feedback.organization_rating,
            feedback.presenter_rating
          ].filter(rating => rating !== null);

          if (ratings.length > 0) {
            totalRating += ratings.reduce((sum: number, rating: number) => sum + rating, 0);
            ratingCount += ratings.length;
          }
        });
      });

      const average = ratingCount > 0 ? totalRating / ratingCount : 0;
      console.log('Project average rating:', {
        totalRating,
        ratingCount,
        average: average.toFixed(1)
      });

      return average;
    },
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">مستوى تقييم المشروع</CardTitle>
        <Star className={`h-4 w-4 ${getRatingColor(averageRating)}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getRatingColor(averageRating)}`}>
          {averageRating.toFixed(1)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          متوسط تقييم جميع أنشطة المشروع
        </p>
      </CardContent>
    </Card>
  );
};