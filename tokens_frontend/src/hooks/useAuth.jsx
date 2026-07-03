import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

export const useAuth = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onLogin = async(data) => {
   try {
     let res = await axiosInstance.post("/api/auth/login",data)
     console.log('response from login',res)
   } catch (error) {
    console.log('error on login ',error);
   }
  };

  const onRegister = async(data) => {
    try {
      let res = await axiosInstance.post("/api/auth/register",data)
      console.log(res)
    } catch (error) {
     console.log('error on register ',error);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    navigate,
    onLogin,
    onRegister,
  };
};