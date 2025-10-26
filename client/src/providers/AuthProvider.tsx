import { createContext, useEffect, useState, type ReactNode } from "react";
import { userProfile } from "../apis/auth.apis";
import toast from "react-hot-toast";

interface AuthProviderProps {
  children: ReactNode;
}

interface Auth {
  name: string;
  email: string;
  profile: string;
  role: string;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  fetchUserProfile: () => Promise<void>;
  isLoading:boolean
}

const defaultAuth: Auth = {
  name: "",
  email: "",
  profile: "",
  role: "",
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(defaultAuth);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUserProfile = async () => {
    setIsLoading(true)
    try{
 const res = await userProfile();
    setAuth({
      name: res.name,
      email: res.email,
      profile: res.profile,
      role: res.role,
    });
    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false);
    }
   
    
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

 
  return (
    <div>
      <AuthContext.Provider value={{ auth, setAuth, fetchUserProfile,isLoading }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export { AuthContext };
export default AuthProvider;
