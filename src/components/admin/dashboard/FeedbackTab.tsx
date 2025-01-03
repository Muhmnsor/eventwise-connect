import { Card, CardContent } from "@/components/ui/card";
import { FeedbackLink } from "@/components/events/feedback/FeedbackLink";
import { FeedbackSummary } from "@/components/events/feedback/FeedbackSummary";

interface FeedbackTabProps {
  eventId: string;
}

export const FeedbackTab = ({ eventId }: FeedbackTabProps) => {
  console.log('Rendering FeedbackTab for event:', eventId);
  
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">رابط التقييم</h3>
          <FeedbackLink eventId={eventId} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">نتائج التقييم</h3>
          <FeedbackSummary eventId={eventId} />
        </div>
      </CardContent>
    </Card>
  );
};