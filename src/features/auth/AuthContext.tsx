import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

const TOKEN_KEY = 'yumquick.authToken';
const NAME_KEY = 'yumquick.userName';
const EMAIL_KEY = 'yumquick.userEmail';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userName: string | null;
  userEmail: string | null;
  signIn: (email: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(TOKEN_KEY),
      AsyncStorage.getItem(NAME_KEY),
      AsyncStorage.getItem(EMAIL_KEY)
    ])
      .then(([storedToken, storedName, storedEmail]) => {
        setToken(storedToken);
        setUserName(storedName);
        setUserEmail(storedEmail);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, name: string) => {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, email],
      [NAME_KEY, name],
      [EMAIL_KEY, email]
    ]);
    setToken(email);
    setUserName(name);
    setUserEmail(email);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, NAME_KEY, EMAIL_KEY]);
    setToken(null);
    setUserName(null);
    setUserEmail(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated: token !== null,
      isLoading,
      userName,
      userEmail,
      signIn,
      signOut
    }),
    [token, isLoading, userName, userEmail, signIn, signOut]
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
