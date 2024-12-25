import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      console.log('Starting login process for email:', email);
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      console.log('Sign in response:', { data: signInData, error: signInError });

      if (signInError) {
        console.error('Sign in error details:', signInError);
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
        throw new Error('حدث خطأ أثناء تسجيل الدخول');
      }

      if (!signInData?.user) {
        console.error('No user data in response');
        throw new Error('لم يتم العثور على بيانات المستخدم');
      }

      console.log('Successfully signed in user:', signInData.user.id);

      // Get user roles after successful sign in
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select(`
          roles (
            name
          )
        `)
        .eq('user_id', signInData.user.id)
        .single();

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        throw new Error('حدث خطأ أثناء جلب صلاحيات المستخدم');
      }

      console.log('User roles:', userRoles);

      const isAdmin = userRoles?.roles?.name === 'admin';

      set({
        user: {
          id: signInData.user.id,
          email: signInData.user.email ?? '',
          isAdmin: isAdmin
        },
        isAuthenticated: true
      });

      console.log('Auth store updated successfully');
      toast.success('تم تسجيل الدخول بنجاح');
    } catch (error) {
      console.error('Login process failed:', error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول";
      toast.error(errorMessage);
      throw error;
    }
  },
  logout: async () => {
    try {
      console.log('Starting logout process');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isAuthenticated: false });
      toast.success("تم تسجيل الخروج بنجاح");
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("حدث خطأ أثناء تسجيل الخروج");
      throw error;
    }
  }
}));