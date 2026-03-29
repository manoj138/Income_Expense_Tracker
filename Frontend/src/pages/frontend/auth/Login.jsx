import React from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { useState } from "react";
import { Api } from "../../../components/common/Api/api";
import { useAuth } from "../../../context/AuthContext";
import Card from "../../../components/common/Card";
import { Mail, Lock, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/common/Toast";

const Login = () => {
   const { addToast } = useToast();
  const { login } = useAuth();
  const [user, setUser] = useState({});
const navigate = useNavigate()
  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/user/login", user);
      if (res.data.data && res.data.data.token) {
        login(res.data.data.findUser, res.data.data.token);
      }
      
       addToast('login successfully!', 'success')
    } catch (error) {
      console.log(error);
    }
  };

  return (
 <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
  
  <Card className="w-full max-w-[420px] shadow-2xl border-none rounded-3xl overflow-hidden bg-white">
    
    {/* Header Section: Jithe title ani subtitle visualy separate distat */}
    <div className="p-8 pb-0 text-center">
      <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
        <Lock className="text-white" size={24} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
      <p className="text-gray-500 text-sm mt-2">Please enter your credentials to log in</p>
    </div>

    <div className="p-8">
      <form onSubmit={submitHandler} className="space-y-5">
        
        {/* Input Fields */}
        <div className="space-y-4">
          <Input
            label={"Email Address"}
            icon={Mail}
            type="email"
            placeholder={"name@company.com"}
            name={"email"}
            value={user.email || ""}
            onChange={inputHandler}
            className="focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          <div className="space-y-1">
            <Input
              label={"Password"}
              icon={Lock}
              type="password"
              placeholder={"••••••••"}
              name={"password"}
              value={user.password || ""}
              onChange={inputHandler}
            />
            {/* Forgot Password Link (Optional but standard) */}
            <div className="flex justify-end">
              <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
                Forgot password?
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Sign In</span>
        </Button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? {' '}
          <button onClick={()=>navigate('/register')} type="button" className="font-bold text-blue-600 hover:underline">
           Register
          </button>
        </p>

      </form>
    </div>

  </Card>

</div>
  );
};

export default Login;