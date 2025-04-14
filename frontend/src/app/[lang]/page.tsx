import AuthLang from "@/components/lang/auth-lang";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import AuthButton from "@/components/page/welcome/auth-button";
import AuthTheme from "@/components/theme/auth-theme";

const WelcomePage = () => {
  return (
    <section className=" flex justify-between w-full">
      <div className=" w-1/2 p-8">
        <div className=" flex justify-end">
          <AuthTheme />
        </div>
        <div className="  flex flex-col space-y-6 justify-center items-center">
          <MyImage className=" size-16" src="/logo.png" />
        </div>
        <div className=" mt-10 flex flex-col justify-center items-center space-y-1">
          <h1 className=" text-2xl">
            Welcome to{" "}
            <span className=" font-black font-mono leading-1">
              Space Together
            </span>
          </h1>
          <p className="">
            Study smarter, collaborate better, manage easier — start now!
          </p>
        </div>
        <div className=" mt-8 justify-center items-center flex">
          <AuthButton />
        </div>
        <div className="mt-8  space-y-2">
          <div className=" text-center">
            <p>
              By continuing you agree to <span>space together</span>{" "}
              <MyLink href="/">Terms and Conditions</MyLink>
            </p>
          </div>
          <div className=" text-center flex justify-center">
            <AuthLang />
          </div>
        </div>
      </div>
      <div className=" justify-start flex w-1/2">image</div>
    </section>
  );
};

export default WelcomePage;
