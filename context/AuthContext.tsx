import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession();
  const [role, setRole] = useState('student');

  useEffect(() => {
    if (session?.user?.role) {
      setRole(session.user.role);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);