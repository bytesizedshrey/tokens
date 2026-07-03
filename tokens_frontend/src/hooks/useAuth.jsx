import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onLogin = (data) => {
    console.log(data);
  };

  const onRegister = (data) => {
    console.log(data);
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