"use client"

import { erc20Abi } from "@/abis/erc20";
import { OrderAbi } from "@/abis/order";
import { RegistryAbi } from "@/abis/registry";
import BackHeader from "@/components/back-header"
import StarRating from "@/components/star-rating";
import { useToast } from "@/hooks/use-toast";
import { ICompanion, IOrder } from "@/types";
import { calcTime } from "@/utils";
import { wagmiConfig } from "@/utils/wagmi-config";
import { waitForTransactionReceipt } from "@wagmi/core";
import { Loader2 } from "lucide-react";
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useReadContracts, useWriteContract, type BaseError } from "wagmi";

const OrderDetail = () => {

  const params = useParams<{ id: string }>();
  const [idx, companion] = params.id.split('-');
  const [companionInfo, setCompanionInfo] = useState<ICompanion>();
  const [orderInfo, setOrderInfo] = useState<IOrder>();
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [Rating, setRating] = useState(0);
  const { toast } = useToast();
  const router = useRouter()

  // approve
  const { writeContract: approveMethod } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          finalFinish();
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })

  // 结束订单
  const { writeContract: finishOrder } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          setIsLoading(false);
          toast({
            description: "order complete successfully"
          });
          router.push("/confirm");
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })

  const { data } = useReadContracts({
    contracts: [
      {
        address: process.env.NEXT_PUBLIC_ORDER_ADDRESS as `0x${string}`,
        abi: OrderAbi,
        functionName: "getOrderDetail",
        args: [BigInt(idx)],
      },
      {
        address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
        abi: RegistryAbi,
        functionName: "getCompanion",
        args: [companion as `0x${string}`],
      },
    ],
  });

  useEffect(() => {
    if (data) {
      const [order, companion] = data.map(item => item.result)
      setOrderInfo(order as IOrder)
      setCompanionInfo(companion as ICompanion)
    }
  }, [data]);

  const finalFinish = async () => {
    finishOrder({
      abi: OrderAbi,
      address: process.env.NEXT_PUBLIC_ORDER_ADDRESS as `0x${string}`,
      functionName: "completeOrder",
      args: [BigInt(idx), BigInt(Rating), parseEther(price)],
    });
  }

  const completeOrder = async () => {
    setIsLoading(true);
    const calcPrice = `${Number(companionInfo!.pricePerOrder) * 0.8}`;
    setPrice(calcPrice);
    approveMethod({
      abi: erc20Abi,
      address: process.env.NEXT_PUBLIC_ERC20_ADDRESS as `0x${string}`,
      functionName: 'approve',
      args: [process.env.NEXT_PUBLIC_ORDER_ADDRESS as `0x${string}`, parseEther(calcPrice)]
    })

  }

  return (
    <div className="min-h-dvh bg-background flex flex-col gap-10 py-7 px-7">
      <BackHeader title="Order Detail" color="text-black" />

      <div className="flex flex-col items-center gap-5">
        <div className="w-[110px] h-[110px] rounded-full bg-[--bg-confirm] flex justify-center items-center">
          <Image src="/confirm.svg" width={120} height={120} alt="confirm" />
        </div>
        <span className="text-black text-2xl font-bold">Order Completed!</span>
      </div>

      <div className="flex gap-6">
        {
          companionInfo && <>
            <Image src={companionInfo.icon} width={106} height={158} alt="avatar" className="rounded-[20px]" />
            <div className="flex flex-col items-start py-[4px]">
              <div className="flex flex-col gap-1">
                <span className="text-black text-lg font-bold">{companionInfo.name}</span>
                <span className="text-[--text-basic] text-[12px]">{companionInfo.introduction}</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-4">
                  <Image src="/rating.svg" width={40} height={40} alt="rating" />
                  <div className="flex flex-col justify-between">
                    <span className="text-[#989797] text-base">Rating</span>
                    <span className="text-[--text-basic] text-base">{companionInfo.rating} out of 5</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image src="/customer.svg" width={40} height={40} alt="rating" />
                  <div className="flex flex-col justify-between">
                    <span className="text-[#989797] text-base">Customers</span>
                    <span className="text-[--text-basic] text-base">{companionInfo.orderNum}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      {
        orderInfo && <>
          <div className="flex justify-between py-8 border-t border-b border-[#E5E5EA]">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[--text-basic] text-lg font-bold">Start Time</span>
              <span className="text-[#707070] text-sm">{calcTime(Number(orderInfo.startTime), true, true)}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[--text-basic] text-lg font-bold">End Time</span>
              <span className="text-[#707070] text-sm">{calcTime(Number(orderInfo.endTime), true, true)}</span>
            </div>
          </div>
          <div className="border-b flex justify-between border-[#E5E5EA]">
            <div className="flex flex-col items-center gap-3 pb-8">
              <span className="text-[--text-basic] text-lg font-bold">Hospital</span>
              <span className="text-[#707070] text-sm">{orderInfo.hospital}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[--text-basic] items-center text-lg font-bold">Balance Payment</span>
              <span className="text-[#707070] text-sm">{Number(companionInfo!.pricePerOrder) * 0.8}$</span>
            </div>
          </div>
        </>
      }

      <div className="flex gap-7 pl-3">
        <span className="text-[--text-basic] text-lg font-bold">Rate it</span>
        <StarRating
          maxRating={5}
          color="#ffd700"
          size={24}
          defaultRating={5}
          onSetRating={setRating}
        />
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[274px] h-[62px] rounded-2xl bg-[--btn-color] flex justify-center items-center text-lg text-white" onClick={completeOrder}>
          {
            isLoading && <Loader2 className="w-[24px] h-[24px] text-white" />
          }
          Confirm
        </div>
      </div>

    </div>
  )
}
export default OrderDetail