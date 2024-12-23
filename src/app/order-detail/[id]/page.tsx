import BackHeader from "@/components/back-header"
import Image from "next/image"

const OrderDetail = () => {
  return (
    <div className="min-h-dvh bg-background flex flex-col gap-10 py-7 px-7">
      <BackHeader title="Order Detail" color="text-black" />

      <div className="flex flex-col items-center gap-5">
        <div className="w-[110px] h-[110px] rounded-full bg-[--bg-confirm] flex justify-center items-center">
          <Image src="/confirm.svg" width={120} height={120} alt="confirm" />
        </div>
        <span className="text-black text-2xl font-bold">Oeder Completed!</span>

        {/* <Link href="/home">
          <div className="w-[276px] h-[62px] rounded-2xl bg-[--btn-color] flex justify-center items-center text-lg text-white">Back to home</div>
        </Link> */}
      </div>

      <div className="flex gap-6">
        <div className="w-[106px] h-[158px] rounded-[20px] bg-red-500"></div>
        <div className="flex flex-col items-start py-[4px]">
          <div className="flex flex-col gap-1">
            <span className="text-black text-lg font-bold">zhao si</span>
            <span className="text-[--text-basic] text-[12px]">familiar with neurosurgery</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-4">
              <Image src="/rating.svg" width={40} height={40} alt="rating" />
              <div className="flex flex-col justify-between">
                <span className="text-[#989797] text-base">Rating</span>
                <span className="text-[--text-basic] text-base">4.5 out of 5</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Image src="/customer.svg" width={40} height={40} alt="rating" />
              <div className="flex flex-col justify-between">
                <span className="text-[#989797] text-base">Customers</span>
                <span className="text-[--text-basic] text-base">1000+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between py-8 border-t border-b border-[#E5E5EA]">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[--text-basic] text-lg font-bold">Start Time</span>
          <span className="text-[#707070] text-sm">2024-12-20 09:00</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[--text-basic] text-lg font-bold">End Time</span>
          <span className="text-[#707070] text-sm">2024-12-20 12:00</span>
        </div>
      </div>
      <div className="border-b flex justify-between border-[#E5E5EA]">
        <div className="flex flex-col items-center gap-3 pb-8">
          <span className="text-[--text-basic] text-lg font-bold">Hospital</span>
          <span className="text-[#707070] text-sm">xxxxxxx</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[--text-basic] items-center text-lg font-bold">Balance Payment</span>
          <span className="text-[#707070] text-sm">20$</span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[274px] h-[62px] rounded-2xl bg-[--btn-color] flex justify-center items-center text-lg text-white">Confirm</div>
      </div>

    </div>
  )
}
export default OrderDetail