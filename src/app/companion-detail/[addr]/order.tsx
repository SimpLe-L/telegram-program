"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { hospitals } from "@/data";
import { useReadContract, useWriteContract, type BaseError } from "wagmi";
import { RegistryAbi } from "@/abis/registry";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { OrderAbi } from "@/abis/order";
import { waitForTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from "@/utils/wagmi-config";
import { useToast } from "@/hooks/use-toast";
import { erc20Abi } from "@/abis/erc20";
import { parseEther } from "viem";

const formSchema = z.object({
  hospitalName: z.string({
    required_error: "hospitalName is required",
  }),
  type: z.string({
    required_error: "time is required",
  }),
  companion: z.string({
    required_error: "companion is required",
  }),
  phone: z.string({
    required_error: "phone is required",
  }),
  price: z.string({
    required_error: "price is required",
  }),
  note: z.string({
    required_error: "note is required",
  })
});


const Order = ({ jumpToSuccess }: { jumpToSuccess: () => void }) => {

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { data: companionList } = useReadContract({
    abi: RegistryAbi,
    address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
    functionName: 'getAllCompanions'
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalName: "",
      companion: "",
      type: "wholeDay",
      price: "",
      phone: "",
      note: "",
    },
  });
  // approve
  const { writeContract: approveMethod } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          handleApproveSuccess();
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })
  // 创建订单
  const { writeContract: createOrder } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          setIsLoading(false);
          toast({
            description: "order created successfully"
          });
          jumpToSuccess();
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })

  // form.setValue("hospitalName", hospitalValue);
  const selectMethod = (value: string) => {
    const getPerson = companionList?.find((item) => item.addr === value);
    if (getPerson) {
      form.setValue("companion", value);
      form.setValue("price", `${Number(getPerson.pricePerOrder) * 0.2}`);
    }
  }

  const handleApproveSuccess = async () => {
    createOrder({
      abi: OrderAbi,
      address: process.env.NEXT_PUBLIC_ORDER_ADDRESS as `0x${string}`,
      functionName: "createOrder",
      args: [
        form.getValues("companion") as `0x${string}`,
        BigInt(Math.round(Date.now() / 1000)),
        BigInt(Math.round(Date.now() / 1000) + 60 * 5),
        parseEther(form.getValues("price")),
        form.getValues("hospitalName"),
        form.getValues("phone"),
        form.getValues("note")
      ]
    });
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    approveMethod({
      abi: erc20Abi,
      address: process.env.NEXT_PUBLIC_ERC20_ADDRESS as `0x${string}`,
      functionName: 'approve',
      args: [process.env.NEXT_PUBLIC_ORDER_ADDRESS as `0x${string}`, parseEther(data.price)]
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="hospitalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bold text-lg">hospital</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a hospital" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      hospitals.map((item) => <SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>)
                    }
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bold text-lg">Time</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="wholeDay"
                  className="flex gap-4 justify-between"
                >
                  <div className="w-[100px] h-10 px-3 rounded-2xl flex items-center space-x-2 border border-[--btn-color]">
                    <RadioGroupItem value="wholeDay" id="r1" />
                    <Label htmlFor="r1">whole</Label>
                  </div>
                  <div className="w-[100px] h-10 px-3 rounded-2xl flex items-center space-x-2 border border-[--btn-color]">
                    <RadioGroupItem value="morning" id="r2" />
                    <Label htmlFor="r2">morning</Label>
                  </div>
                  <div className="w-[100px] h-10 px-3 rounded-2xl flex items-center space-x-2 border border-[--btn-color]">
                    <RadioGroupItem value="afeternoon" id="r3" />
                    <Label htmlFor="r3">afeternoon</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bold text-lg">companion</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={selectMethod}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a companion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      companionList?.map((item) => {
                        return <SelectItem value={item.addr} key={item.addr}>{item.name}</SelectItem>
                      })
                    }
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bold text-lg">Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Phone Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bold text-lg">Deposit</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter Deposit" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bold text-lg">Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="note something"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full">

          <Button
            type="submit"
            className="bg-[--btn-color] w-full"
          >
            {
              isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            }
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default Order