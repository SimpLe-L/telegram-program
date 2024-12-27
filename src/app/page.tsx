// "use client";

import LoginButton from "@/components/login-button";
import Image from 'next/image';
export default function Home() {

  return (
    <div className="flex flex-col h-dvh items-center bg-[url('/bg.png')] bg-cover bg-center pt-28">
      <Image src="/banner.png" alt="Logo" width={400} height={200} className="rounded-s-2xl overflow-hidden" />
      <div className="flex my-20 gap-4">
        <span className="font-bold text-[46px] text-white rotate-[-20deg] translate-y-2">Not</span>
        <span className="font-bold text-[46px] text-white">Alone</span>
      </div>
      <div className="mt-40">
        <LoginButton />
      </div>
    </div>
  )
}
