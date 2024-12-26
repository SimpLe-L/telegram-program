"use client"

import Image from "next/image";
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
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Loader2, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { useAccount, usePublicClient, useWriteContract, type BaseError } from "wagmi";
import { useState } from "react";

import { RegistryAbi } from "@/abis/registry";
import { useToast } from "@/hooks/use-toast";
import { calcTime } from "@/utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  fullName: z.string({
    required_error: "fullName is required",
  }),
  date: z.date({
    required_error: "date is required",
  }),
  accountType: z.enum(["user", "companion"]),
  price: z.coerce.number().optional(),
  email: z.string({
    required_error: "email is required",
  }).email(),
  phone: z.string({
    required_error: "phone is required",
  }),
  introduction: z.string({
    required_error: "introduction is required",
  }),
  icon: z.string({
    required_error: "icon is required",
  })
}).superRefine((data, ctx) => {

  if (
    data.accountType === "companion" && (!data.price || data.price < 1)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["price"],
      message: "price is required",
    });
  }
});


const LoginPage = () => {

  const [avatarPath, setAvatarPath] = useState<string>("/default.png");
  const { toast } = useToast();
  const { chainId } = useAccount();
  const client = usePublicClient({ chainId });
  const [isLoading, setIsLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      accountType: "user",
      email: "",
      phone: "",
      introduction: "",
      icon: "",
    },
  });

  const accountType = form.watch("accountType");

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_KEY as string,
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET as string
        },
        body: formData
      });

      const data = await response.json();
      const cid = data.IpfsHash;
      setAvatarPath(`${process.env.NEXT_PUBLIC_PINATA_GATEWAY}${cid}`);
      form.setValue("icon", `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}${cid}`);
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const hash = await writeContractAsync({
        abi: RegistryAbi,
        address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
        functionName: "registerUser",
        args: [
          data.fullName,
          calcTime(new Date(data.date).getTime()),
          data.phone,
          data.email,
          data.icon,
          data.introduction,
          data.accountType === "companion" ? 1 : 0,
          BigInt(data.price ?? 0)
        ]
      });
      await client?.waitForTransactionReceipt({ hash })
      setIsLoading(false);
      toast({
        description: "registered successfully"
      });
      router.push(`/home`,)
    } catch (er) {
      setIsLoading(false);
      toast({
        description: "something is error"
      });
    }
  }

  return (
    <div className="h-dvh pb-7">
      <div className="flex justify-center w-full">
        <div className="w-[138px] h-[180px] rounded-b-[70px] bg-[--bg-green] flex justify-center items-end pb-7">
          <div className="size-[90px] rounded-full overflow-hidden relative">
            <Image src={avatarPath} width={90} height={90} alt="avatar" />
            <Input className="w-[90px] h-[90px] rounded-full opacity-0 absolute top-0 left-0" onChange={uploadImg} type="file" />
            <Image src="/camera.svg" width={26} height={26} alt="pick" className="absolute right-2 bottom-0" />
          </div>
        </div>
      </div>

      {/* form */}
      <div className="px-7 pt-9">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="bold text-lg">Full Name</FormLabel>
                  <FormControl>
                    <Input className="h-14 rounded-2xl !bg-[--bg-blue] border-none" placeholder="Enter Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="bold text-lg">Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-14 rounded-2xl !bg-[--bg-green-one]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-[#30C084]" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            {/* onValueChange={(value) => {
              if (value) setValue(value);
            }} */}
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="bold text-lg">User Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <div className="pl-3 w-1/2 h-14 rounded-2xl flex items-center space-x-2 bg-[--bg-green-two]">
                        <RadioGroupItem value="user" id="r2" />
                        <Label htmlFor="r2">user</Label>
                      </div>
                      <div className="pl-3 w-1/2 h-14 rounded-2xl flex items-center space-x-2 bg-[--bg-green-two]">
                        <RadioGroupItem value="companion" id="r1" />
                        <Label htmlFor="r1">companion</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            {accountType === "companion" && (
              <>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bold text-lg">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          className="h-14 rounded-2xl !bg-[--bg-blue] border-none"
                          placeholder="Enter Price"
                          {...field}
                          value={
                            field.value ?? ""
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="bold text-lg">Email</FormLabel>
                  <FormControl>
                    <Input className="h-14 rounded-2xl !bg-[--bg-pink] border-none" placeholder="Enter Email" {...field} />
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
                    <Input className="h-14 rounded-2xl !bg-[--bg-purple] border-none" placeholder="Enter Phone Number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="bold text-lg">Introduction</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter introduction"
                      className="resize-none !bg-[--bg-blue]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end gap-2">
              <Button
                type="submit"
                className="w-full h-14 mt-3 rounded-2xl bg-[#30C084] hover:bg-[#30C084]"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default LoginPage