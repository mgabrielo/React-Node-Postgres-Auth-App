import React from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";
import { authAction } from "../../hooks/authAction";

const Register = () => {
  const { handleRegisterAuth, checkError, setCheckError, error, loading } =
    authAction();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password", "");

  const handleRegister = async (data, e) => {
    e.preventDefault();
    await handleRegisterAuth(data).then(() => {
      reset({});
    });
  };

  return (
    <AuthLayout
      authSwitchDesc={"Already Got An Account..."}
      authSwitchLabel={"Login"}
      authSwitchLink={"/login"}
      title={"Register"}
      error={error}
      loading={loading}
      checkError={checkError}
      setCheckError={setCheckError}
    >
      <AuthForm
        title={"Register"}
        onClick={handleSubmit((data, e) => handleRegister(data, e))}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
        control={control}
        password={password}
      />
    </AuthLayout>
  );
};
export default Register;