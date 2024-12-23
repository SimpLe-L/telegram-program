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

  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      accountType: "user",
      email: "",
      phone: "",
    },
  });

  const accountType = form.watch("accountType");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // console.log(data)
    router.push(`/home`,)
  }

  return (
    <div className="h-dvh">
      <div className="flex justify-center w-full">
        <div className="w-[138px] h-[200px] rounded-b-[70px] bg-[--bg-green] flex justify-center items-end pb-7">
          <div className="size-[90px] rounded-full flex justify-end items-end border bg-red">
            <Image src="/camera.svg" width={26} height={26} alt="pick" />
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
                  <FormLabel className="bold text-lg">Name</FormLabel>
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
            <div className="w-full flex justify-end gap-2">
              <Button
                type="submit"
                className="w-full h-14 mt-3 rounded-2xl bg-[#30C084] hover:bg-[#30C084]"
              >
                {/* {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
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