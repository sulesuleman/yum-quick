import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

const TOKEN_KEY = 'yumquick-admin.authToken';
const NAME_KEY = 'yumquick-admin.name';
const EMAIL_KEY = 'yumquick-admin.email';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  adminName: string | null;
  adminEmail: string | null;
  signIn: (email: string, name: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
    setAdminName(localStorage.getItem(NAME_KEY));
    setAdminEmail(localStorage.getItem(EMAIL_KEY));

    // Minimum splash duration so the branded splash screen is actually visible on load,
    // rather than flashing for a few milliseconds while localStorage is read.
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const signIn = useCallback((email: string, name: string) => {
    localStorage.setItem(TOKEN_KEY, email);
    localStorage.setItem(NAME_KEY, name);
    localStorage.setItem(EMAIL_KEY, email);
    setToken(email);
    setAdminName(name);
    setAdminEmail(email);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setToken(null);
    setAdminName(null);
    setAdminEmail(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated: token !== null,
      isLoading,
      adminName,
      adminEmail,
      signIn,
      signOut
    }),
    [token, isLoading, adminName, adminEmail, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
