import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";

export const checkUserRole = async (userId: string): Promise<boolean> => {
  const { data: roleIds, error: roleIdsError } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', userId)
    .single();

  if (roleIdsError) {
    console.error("SessionManager: Error fetching role IDs:", roleIdsError);
    return false;
  }

  if (!roleIds) {
    console.log("SessionManager: No roles found for user");
    return false;
  }

  const { data: roles, error: rolesError } = await supabase
    .from('roles')
    .select('name')
    .eq('id', roleIds.role_id)
    .single();

  if (rolesError) {
    console.error("SessionManager: Error fetching role names:", rolesError);
    return false;
  }

  return roles?.name === 'admin';
};

export const initializeSession = async (): Promise<{ user: User | null; isAuthenticated: boolean }> => {
  console.log("SessionManager: Initializing session");
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("SessionManager: Session error:", error);
      return { user: null, isAuthenticated: false };
    }

    if (!session?.user) {
      console.log("SessionManager: No active session");
      return { user: null, isAuthenticated: false };
    }

    const isAdmin = await checkUserRole(session.user.id);

    return {
      user: {
        id: session.user.id,
        email: session.user.email ?? '',
        isAdmin
      },
      isAuthenticated: true
    };
  } catch (error) {
    console.error("SessionManager: Initialization error:", error);
    return { user: null, isAuthenticated: false };
  }
};

export const clearSession = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear any local storage items
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.clear();
    
    console.log("SessionManager: Session cleared successfully");
  } catch (error) {
    console.error("SessionManager: Error clearing session:", error);
    throw error;
  }
};