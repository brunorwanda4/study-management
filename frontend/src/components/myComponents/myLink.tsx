"use client"
import Link, { useLinkStatus } from "next/link";
import { Button, shadcnVariants, daisyVariants } from "../ui/button";

type props = {
  href: string;
  type?: "button" | "link";
  className?: string;
  classname?: string;
  children: React.ReactNode | string;
  button?: typeof shadcnVariants | typeof daisyVariants;
  loading ?: boolean
};
const MyLink = ({
  href,
  type,
  className,
  classname,
  children,
  button,
  loading
}: props) => {
  const { pending } = useLinkStatus();

  if (type === "button") {
    return (
      <Link href={href} className={className}>
        <Button {...button} className={classname}>
          {children}
          {loading && (pending && (
            <span
              aria-label="Loading"
              className="loading loading-spinner"
            ></span>
          ))}
        </Button>
      </Link>
    );
  }

  return (
    <Link href={href} className={className ? className : "underline"}>
      {loading ? (pending ? (
        <span aria-label="Loading" className="loading loading-spinner"></span>
      ) : (
        children
      )) : children}
    </Link>
  );
};

export default MyLink;
