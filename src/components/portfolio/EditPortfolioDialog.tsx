import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PortfolioForm } from "./PortfolioForm";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditPortfolioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portfolio: {
    id: string;
    name: string;
    description: string | null;
  };
}

export const EditPortfolioDialog = ({
  open,
  onOpenChange,
  portfolio,
}: EditPortfolioDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (values: { name: string; description: string }) => {
    setIsLoading(true);
    console.log('Updating portfolio:', values);

    try {
      // First get the portfolio's Asana ID
      const { data: portfolioData, error: fetchError } = await supabase
        .from('portfolios')
        .select('asana_gid')
        .eq('id', portfolio.id)
        .single();

      if (fetchError) {
        console.error('Error fetching portfolio:', fetchError);
        throw fetchError;
      }

      // If portfolio has an Asana ID, update it in Asana first
      if (portfolioData?.asana_gid) {
        console.log('Updating portfolio in Asana:', portfolioData.asana_gid);
        const response = await supabase.functions.invoke('update-portfolio', {
          body: {
            portfolioId: portfolio.id,
            asanaGid: portfolioData.asana_gid,
            name: values.name,
            description: values.description
          }
        });

        if (response.error) {
          console.error('Error updating portfolio in Asana:', response.error);
          throw new Error('فشل في تحديث المحفظة في Asana');
        }

        console.log('Successfully updated portfolio in Asana:', response.data);
      }

      // Then update in our database
      const { error: updateError } = await supabase
        .from('portfolios')
        .update({
          name: values.name,
          description: values.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', portfolio.id);

      if (updateError) {
        console.error('Error updating portfolio:', updateError);
        throw updateError;
      }

      await queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast.success('تم تحديث المحفظة بنجاح');
      onOpenChange(false);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error(error instanceof Error ? error.message : 'حدث خطأ أثناء تحديث المحفظة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل المحفظة</DialogTitle>
        </DialogHeader>
        <PortfolioForm
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
          initialData={{
            name: portfolio.name,
            description: portfolio.description || '',
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};