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


const Order = () => {

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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a companion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
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
              <FormLabel>Bio</FormLabel>
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
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default Order