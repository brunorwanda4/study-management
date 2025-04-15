import AuthProvider from "@/components/page/auth/auth-provider";
import RegisterForm from "@/components/page/auth/forms/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="">
      <div className=" space-y-1 text-center">
        <h1 className="title-page">Welcome</h1>
        <h3 className="">
          Sign up to your
          <span className="font-medium font-mono leading-1 text-sm">
            space-together
          </span>{" "}
          account! ☺️
        </h3>
      </div>
      <div className=" mt-4 flex w-full space-x-4 lg:flex-row flex-col-reverse space-y-4 lg:space-y-0">
        <div className=" space-y-2">
          <h4 className=" basic-title">Use providers:</h4>
          <AuthProvider />
        </div>
        <div className=" space-y-2">
          <h4 className=" basic-title">User your email:</h4>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
