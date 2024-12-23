"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

const PrivyLoginButton = () => {
  const { ready, authenticated, user, login } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const disableLogin = !ready || (ready && authenticated);

  useEffect(() => {
  }, [ready, authenticated, user]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-1.5 px-6 py-2.5 min-w-32 min-h-12 rounded-xl font-medium cursor-pointer select-none
        `}
      onClick={handleLogin}
      disabled={disableLogin || isLoading}
    >
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="h-[40px] px-4 rounded-[16px] bg-[--btn-color] text-[--basic-text] flex justify-center items-center font-bold cursor-pointer">Login</div>
      )}
    </button>
  );
};

export default PrivyLoginButton;
