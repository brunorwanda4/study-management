import MyLink, { LoadingIndicator } from "@/components/myComponents/myLink";
import Link from "next/link";
import React from "react";

const links = [
  { href: '/shop/electronics', label: 'Electronics' },
  { href: '/shop/clothing', label: 'Clothing' },
  { href: '/shop/books', label: 'Books' },
]
 
function Menubar() {
  return (
    <div>
      {links.map((link) => (
        <Link key={link.label} href={link.href}>
          {link.label} <LoadingIndicator />
        </Link>
      ))}
    </div>
  )
}

const RegisterPage = () => {
  return (
    <div>
       <Menubar />
      Register page
      <Link href="/auth/onboarding" prefetch>
        Dashboard <LoadingIndicator />
      </Link>
      <div className=" h-10"></div>
      <MyLink
        loading
        button={{library : "daisy",variant: "info" , size: "lg"}}
        href={`/auth/login`}
        type="button"
        className=" w-full"
      >
        Sign in
      </MyLink>
    </div>
  );
};

export default RegisterPage;
