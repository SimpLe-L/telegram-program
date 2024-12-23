import { House, Plus, UserRound } from "lucide-react"
import Link from "next/link"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import Order from "@/components/order-form"

const FooterComponent = () => {
  return (
    <div className="w-full h-[75px] rounded-t-[20px] fixed bottom-0 shadow-bar px-16 flex items-start justify-between">
      <div className="flex flex-col gap-1 mt-4">
        <House />
        <span className="text-[#8E8E93] text-[10px]">Home</span>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="size-[54px] bg-[--btn-color] rounded-b-2xl flex justify-center items-end pb-2">
            <div className="size-[30px] rounded-full flex justify-center items-center bg-white">
              <Plus className="text-[--btn-color] w-3 h-3" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fill out the order</DialogTitle>
          </DialogHeader>
          <Order />
        </DialogContent>
      </Dialog>

      {/* <div className="size-[54px] bg-[--btn-color] rounded-b-2xl flex justify-center items-end pb-2">
        <div className="size-[30px] rounded-full flex justify-center items-center bg-white">
          <Plus className="text-[--btn-color] w-3 h-3" />
        </div>
      </div> */}

      <Link href="/profile">
        <div className="flex flex-col gap-1  mt-4">
          <UserRound />
          <span className="text-[#8E8E93] text-[10px]">Profile</span>
        </div>
      </Link>

    </div>
  )
}
export default FooterComponent

