"use client"

import Image from "next/image"
// import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import Order from "@/components/order-form"
import BackHeader from "@/components/back-header"

const CompanionDetail = () => {

  // const router = useRouter()
  // const backHospital = () => {
  //   router.back()
  // }

  return (
    <div className="w-full h-dvh py-7 px-7 flex flex-col">
      <BackHeader title="Find Your Medical Companion" color="text-black" />
      <div className="flex mt-10 gap-6">
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

      <div className="mt-5 rounded-[20px] shadow-user flex-1 pt-2 px-6 flex flex-col justify-between pb-5">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-6">
            <span className="text-[--text-basic] text-lg">Biography</span>
            <p className="text-[#707070] text-[14px]">Dr.Samantha Sima is an indian heart surgeon sepecialist. She pratices general at Max Hospital in dehareadun.....</p>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <span className="text-[--text-basic] text-lg">NFT</span>
            <div className="flex gap-3 flex-wrap min-h-40">
              <div className="w-[100px] h-[160px] rounded-[20px] bg-red-500"></div>
              <div className="w-[100px] h-[160px] rounded-[20px] bg-red-500"></div>
              <div className="w-[100px] h-[160px] rounded-[20px] bg-red-500"></div>
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full h-[60px] rounded-2xl flex justify-center items-center font-semibold text-white bg-[#30C084]">
              Place an order
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fill out the order</DialogTitle>
            </DialogHeader>
            <Order />
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}
export default CompanionDetail