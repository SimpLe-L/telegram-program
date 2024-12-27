"use client"

import { use, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Connector, useConnect } from 'wagmi';
import { useRouter } from "next/navigation";
import { getAccount, readContract } from '@wagmi/core'
import { wagmiConfig } from "@/utils/wagmi-config";
import { RegistryAbi } from "@/abis/registry";
import useStore from "@/store";


const DialogBtn = () => {

    const { connectors, connect, isSuccess } = useConnect();
    const [openFlag, setOpenFlag] = useState(false);
    const router = useRouter();
    const setType = useStore(state => state.setType);

    useEffect(() => {
        if (isSuccess) {
            setOpenFlag(false);
            const { address } = getAccount(wagmiConfig);
            (async () => {
                const result = await readContract(wagmiConfig, {
                    abi: RegistryAbi,
                    address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
                    functionName: 'getUserType',
                    args: [address as `0x${string}`]
                });
                if (result) {
                    setType(result);
                    router.push(`/home`)
                } else {
                    router.push(`/registry`)
                }
            })();
        }
    }, [isSuccess]);


    const handleConnect = async (connector: Connector) => {
        connect({ connector });
    }

    const handleOpenChange = (value: boolean) => {
        setOpenFlag(value);
    }

    return (
        <Dialog open={openFlag} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className='w-[400px] py-6 rounded-[16px] bg-[--bg-radio] text-white flex justify-center items-center font-bold cursor-pointer'>CONNECT</div>
            </DialogTrigger>
            <DialogContent className='border-[--card-bg]'>
                <DialogHeader>
                    <DialogTitle className='text-[--basic-text] mb-4'>Login</DialogTitle>
                </DialogHeader>

                <div className="flex justify-center items-center gap-2">
                    <div className="w-28 h-[1px] opacity-80 bg-gradient-to-l from-[#ddd] to-[rgba(98, 98, 102, 0)]"></div>
                    <span className="whitespace-nowrap">CONNECT WALLET</span>
                    <div className="w-28 h-[1px] opacity-80 bg-gradient-to-r from-[#ddd] to-[rgba(98, 98, 102, 0)]"></div>
                </div>

                <div className="flex flex-col gap-2">
                    {
                        connectors.map((connector, index) => (
                            <div className="w-full h-[42px] flex justify-center items-center bg-[--card-bg] rounded-xl cursor-pointer" key={connector.uid} onClick={() => handleConnect(connector)}>
                                {connector.name}
                            </div>
                        ))
                    }
                </div>

            </DialogContent>
        </Dialog>
    );
};
export default DialogBtn;