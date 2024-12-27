"use client"

import BackIcon from "@/components/back-header/back-icon";
import { Cake, CircleDollarSign, LogOut, Mail, PhoneCall, Star } from "lucide-react";
import Image from "next/image";
import ListItem from "./list-item";
import Link from "next/link";
import { useAccount, useReadContract, useDisconnect, useReadContracts, useWriteContract, type BaseError } from "wagmi";
import { OrderAbi } from "@/abis/order";
import { RegistryAbi } from "@/abis/registry";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { NftAbi } from "@/abis/nft";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "@/utils/wagmi-config";
import { useToast } from "@/hooks/use-toast";


const Profile = () => {

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const userType = useStore(state => state.userType);
  const { toast } = useToast();
  // mint
  const { writeContract: mint } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          toast({
            description: "mint成功！",
          });
          refetch();
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  });

  const { data: personDetail } = useReadContract({
    abi: RegistryAbi,
    address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
    functionName: userType == 1 ? 'getRegularUser' : 'getCompanion',
    args: [address as `0x${string}`]
  });

  const { data: orderList } = useReadContract({
    abi: OrderAbi,
    address: process.env.NEXT_PUBLIC_ORDER_ADDRESS as `0x${string}`,
    functionName: 'getOrdersByUser',
    args: [address as `0x${string}`]
  });

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        address: process.env.NEXT_PUBLIC_ORDER_ADDRESS as `0x${string}`,
        abi: OrderAbi,
        functionName: "getBalance",
        args: [address as `0x${string}`],
      },
      {
        abi: NftAbi,
        address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
        functionName: 'getNFTs',
        args: [address as `0x${string}`]
      },
    ],
  });

  const mintMethod = () => {
    mint({
      abi: NftAbi,
      address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
      functionName: 'safeMint',
      args: [address as `0x${string}`]
    })
  }

  const loginOut = () => {
    disconnect();
    router.push("/")
  }

  return (
    <div className="min-h-dvh bg-[--btn-color] flex flex-col relative pb-7">

      <div className="absolute left-[20px] bottom-[60px]" onClick={loginOut}>
        <LogOut className="w-6 h-6 text-white" />
      </div>

      <div className="absolute left-[30px] top-[30px]">
        <BackIcon iconColor={false} />
      </div>

      <div className="flex justify-center w-full">
        <div className="w-[138px] h-[200px] rounded-b-[70px] bg-[--bg-profile] flex justify-center items-end pb-7">
          <div className="size-[90px] rounded-full overflow-hidden relative">
            {
              personDetail && <Image src={personDetail.icon || "/default.png"} width={90} height={90} alt="avatar" />
            }
            <Image src="/camera.svg" width={26} height={26} alt="pick" className="absolute right-2 bottom-0" />
          </div>
        </div>
      </div>
      {
        personDetail && <>
          <div className="flex flex-col px-[30px] mt-5 gap-3">
            <span className="text-2xl font-bold text-white">Hello~</span>
            <span className="text-2xl font-bold text-white">{personDetail.name}</span>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex gap-2 items-center">
                <Cake className="text-white" />
                <span className="text-white font-semibold text-[16px]">{personDetail.birthday}</span>
              </div>
              <div className="flex gap-2 items-center">
                <PhoneCall className="text-white" />
                <span className="text-white font-semibold text-[16px]">{personDetail.phone}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Star className="text-white" />
                <span className="text-white font-semibold text-[16px]">{personDetail.rating}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="text-white" />
                <span className="text-white font-semibold text-[16px]">{personDetail.email}</span>
              </div>
            </div>
          </div>
        </>
      }
      {
        userType == 2 && <div className="flex flex-col gap-4 mt-5 px-[30px]">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="text-white" />
              <span className="text-white font-semibold text-[16px]">{data && data[0].result?.toString()}</span>
            </div>
            <div className="px-3 py-1 bg-[--bg-radio] text-white rounded-3xl">WithDraw</div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-5">
              <span className="text-2xl font-bold text-white">NFT</span>
              <div className="px-3 py-1 bg-[--bg-radio] text-white rounded-3xl" onClick={mintMethod}>MINT</div>
            </div>

            <div className="flex gap-3 flex-wrap min-h-40">
              {
                data && data[1].result?.map((nft, index) => (
                  <Image key={index} src={nft.uri} width={100} height={160} alt="nft" className="rounded-[20px]" />
                ))
              }
            </div>
          </div>
        </div>
      }

      <div className="w"></div>

      <div className="flex flex-col gap-2 mt-10 px-[30px]">
        <span className="text-2xl font-bold text-white">Order List</span>
        {
          orderList && orderList.map((info, index) => (
            <Link href={`/order-detail/${info.Idx.toString()}-${info.companion}`} key={index}>
              <ListItem key={index} info={info} />
            </Link>
          ))
        }
      </div>
    </div>
  )
}
export default Profile