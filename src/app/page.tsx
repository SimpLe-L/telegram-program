"use client";

import PrivyLoginButton from "@/components/privy-button";
// import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import LoginButton from "@/components/login-button";
// import { useEffect } from "react";
export default function Home() {

  // const { ready, authenticated } = usePrivy();
  const router = useRouter();

  // useEffect(() => {
  //   if (authenticated) {
  //     router.push("/registry");
  //   }
  // }, [authenticated]);

  // if (authenticated) {
  //   router.push("/registry");
  // }

  return (
    <div className="flex flex-col h-dvh items-center justify-center">
      {/* {
        !authenticated && <PrivyLoginButton />
      } */}
      <LoginButton />
    </div>
  )
}
