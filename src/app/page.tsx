import LoginButton from "@/components/login-button";
export default function Home() {
  return (
    <div className="flex flex-col items-center pt-24 pb-6">
      {/* <Image
        src="/images/yy_beforelogin_logo.svg"
        alt={"logo"}
        width={846}
        height={557}
      /> */}
      <LoginButton />
    </div>
  )
}
