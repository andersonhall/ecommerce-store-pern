import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetch("http://localhost:3000/auth")
          .then((res) => res.json())
          .then((data) => {
            if (data.isAuthenticated) {
              setIsAuthenticated(true);
            }
          });
      } catch (error) {
        return console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          return await res.json().then((data) => {
            console.log(data.message);
            setUser(data.user);
            setIsAuthenticated(true);
          });
        } else {
          return await res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = async () => {
    await fetch("http://localhost:3000/logout", {
      credentials: "include",
    }).then(async (res) => {
      if (res.ok) {
        return await res.json().then((data) => {
          console.log(data.message);
          localStorage.clear();
          setIsAuthenticated(false);
        });
      } else {
        return await res.json().then((data) => {
          throw new Error(data.message);
        });
      }
    });
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
