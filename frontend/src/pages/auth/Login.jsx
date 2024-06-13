import React from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";
import { authAction } from "../../hooks/authAction";

const Login = () => {
  const { handleLoginAuth, checkError, setCheckError, authError } =
    authAction();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    await handleLoginAuth(data).then(() => {
      reset({});
    });
  };

  return (
    <AuthLayout
      authSwitchDesc={"Don't Have An Account...?"}
      authSwitchLabel={"Register"}
      authSwitchLink={"/register"}
      title={"Login"}
      checkError={checkError}
      setCheckError={setCheckError}
    >
      <AuthForm
        title={"Login"}
        onClick={handleSubmit((data, e) => handleLogin(data, e))}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
      />
    </AuthLayout>
  );
};

export default Login;