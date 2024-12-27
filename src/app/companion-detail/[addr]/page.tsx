"use client"

import Image from "next/image"
import { useParams, useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
// import Order from "@/components/order-form"
import Order from "./order"
import BackHeader from "@/components/back-header"
import { useReadContract } from "wagmi"
import { RegistryAbi } from "@/abis/registry"
import { useState } from "react"
import { NftAbi } from "@/abis/nft"

const CompanionDetail = () => {

  const params = useParams<{ addr: string }>()
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const { data: companionInfo } = useReadContract({
    abi: RegistryAbi,
    address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
    functionName: 'getCompanion',
    args: [params.addr as `0x${string}`]
  });
  const { data: nfts } = useReadContract({
    abi: NftAbi,
    address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
    functionName: 'getNFTs',
    args: [params.addr as `0x${string}`]
  });

  const handleChange = (value: boolean) => {
    setShowDialog(value);
  }

  const jumpToSuccess = () => {
    setShowDialog(false);
    router.push("/confirm");
  }

  return (
    <div className="w-full min-h-dvh py-7 px-7 flex flex-col">
      <BackHeader title="Find Your Medical Companion" color="text-black" />
      {
        companionInfo &&
        <>
          <div className="flex mt-10 gap-6">
            <Image src={companionInfo!.icon} width={106} height={158} alt="avatar" className="rounded-[20px]" />
            <div className="flex flex-col items-start py-[4px]">
              <div className="flex flex-col gap-1">
                <span className="text-black text-lg font-bold">{companionInfo?.name}</span>
                <span className="text-[--text-basic] text-[12px] whtitespace-nowrap overflow-hidden text-ellipsis">{companionInfo?.introduction}</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-4">
                  <Image src="/rating.svg" width={40} height={40} alt="rating" />
                  <div className="flex flex-col justify-between">
                    <span className="text-[#989797] text-base">Rating</span>
                    <span className="text-[--text-basic] text-base">{companionInfo?.rating} out of 5</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image src="/customer.svg" width={40} height={40} alt="rating" />
                  <div className="flex flex-col justify-between">
                    <span className="text-[#989797] text-base">Customers</span>
                    <span className="text-[--text-basic] text-base">{companionInfo?.orderNum}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[20px] shadow-user flex-1 pt-2 px-6 flex flex-col gap-4 justify-between pb-5">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-6">
                <span className="text-[--text-basic] text-lg">Introduction</span>
                <p className="text-[#707070] text-[14px]">{companionInfo?.introduction}</p>
              </div>

              <div className="flex flex-col gap-6 mt-6">
                <span className="text-[--text-basic] text-lg">NFT</span>
                <div className="flex gap-3 flex-wrap min-h-40">
                  {
                    nfts && nfts.map((nft, index) => (
                      <Image key={index} src={nft.uri} width={100} height={160} alt="nft" className="rounded-[20px]" />
                    ))
                  }
                </div>
              </div>
            </div>

            <Dialog open={showDialog} onOpenChange={handleChange}>
              <DialogTrigger asChild>
                <div className="w-full h-[60px] rounded-2xl flex justify-center items-center font-semibold text-white bg-[#30C084]">
                  Place an order
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Fill out the order</DialogTitle>
                </DialogHeader>
                <Order jumpToSuccess={jumpToSuccess} />
              </DialogContent>
            </Dialog>

          </div>
        </>
      }
    </div>
  )
}
export default CompanionDetail