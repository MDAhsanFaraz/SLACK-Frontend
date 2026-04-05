const { createContext, useState, useEffect } = require("react");

const AuthContext = new createContext();

/**
 * THE CONNECTION TO combineContext (Step 2)
 * 
 * When we use combineContext(AuthContextProvider, ThemeProvider) to wrap our app, 
 * this component acts as one of the "Boxes".
 * 
 * 1. The combineContext machine's `reduceRight` loop takes the current state of our app
 *    (the `accumulator`) and wraps this AuthContextProvider around it.
 * 2. It literally writes: <AuthContextProvider>{accumulator}</AuthContextProvider>
 * 3. React sees the `{accumulator}` inside these tags and automatically passes it 
 *    into this component as the `children` prop.
 * 
 * @param {ReactNode} children - This represents whatever is nested inside this Provider.
 *                               Ultimately, this will be our <App /> (the unwrapped present) 
 *                               or the next layer of Providers.
 */
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user & token) {
      setAuth({
        user: JSON.parse(user),
        token: token,
      });
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {/* 
        This is where we actually drop the "present" (the children) inside the "box".
        Without this line, anything wrapped by AuthContextProvider would just disappear!
      */}
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
