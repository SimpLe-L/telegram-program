import BackHeader from "@/components/back-header"
import Image from "next/image";
import Link from "next/link";

const ConfirmPage = () => {
  return (
    <div className="min-h-dvh flex flex-col py-7 px-7">
      <BackHeader title="Confirmation" color="text-black" />

      <div className="flex flex-col items-center gap-5 mt-44">
        <div className="w-[110px] h-[110px] rounded-full bg-[--bg-confirm] flex justify-center items-center">
          <Image src="/confirm.svg" width={120} height={120} alt="confirm" />
        </div>
        <span className="text-black text-2xl font-bold">Order Confirmed!</span>

        <Link href="/home">
          <div className="w-[276px] h-[62px] rounded-2xl bg-[--btn-color] flex justify-center items-center text-lg text-white">Back to home</div>
        </Link>
      </div>
    </div>
  )
}
export default ConfirmPage