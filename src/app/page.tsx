"use client";

import PrivyLoginButton from "@/components/privy-button";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
export default function Home() {

  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  if (authenticated) {
    router.push("/registry");
  }

  return (
    <div className="flex flex-col h-dvh items-center justify-center">
      {/* <Image
        src="/images/yy_beforelogin_logo.svg"
        alt={"logo"}
        width={846}
        height={557}
      /> */}
      {/* <LoginButton /> */}
      <PrivyLoginButton />
    </div>
  )
}
