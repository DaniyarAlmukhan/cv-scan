import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, removeAccessToken, setAccessToken } from 'requests/token.request';

interface AuthContextType {
  token?: string | null;
  handleSetToken: (token: string) => void;
  handleRemoveToken: () => void;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  handleSetToken: () => null,
  handleRemoveToken: () => null,
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: React.FC<IProps> = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem(ACCESS_TOKEN) as string,
  );

  const handleSetToken = (tokenValue: string) => {
    setToken(tokenValue);
    setAccessToken(tokenValue);
    navigate('/user-groups');
  };

  const handleRemoveToken = () => {
    setToken(null);
    removeAccessToken();
  };

  const value = { token, handleSetToken, handleRemoveToken };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
