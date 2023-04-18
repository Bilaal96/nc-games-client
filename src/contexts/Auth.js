import { createContext, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

// Simulates user login, with a default user set on initial load
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'tickle122',
    name: 'Tom Tickle',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
  });

  const login = (userObj) => setUser(userObj);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
