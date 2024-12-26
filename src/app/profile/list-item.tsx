import { IOrder } from "@/types"
import { calcTime } from "@/utils"
import { BadgeCheck, BadgeDollarSign, Clock9 } from "lucide-react"
import Image from "next/image"

type CardProps = {
  info: IOrder
}

const ListItem = ({ info }: CardProps) => {

  const whichIcon = (isCompleted: boolean, time: BigInt) => {
    if (isCompleted) {
      return <BadgeCheck className="w-[24px] h-[24px] text-[--bg-radio]" />
    } else {
      return Date.now() > Number(time) ? <BadgeDollarSign className="w-[24px] h-[24px] text-[--bg-pink]" /> : <Clock9 className="w-[24px] h-[24px] text-[#adadad]" />
    }
  }

  return (
    <div className="w-full p-4 flex justify-between items-start rounded-lg shadow-3xl bg-white">
      <div className="flex gap-3">
        <div className="w-[64px] h-[64px] bg-[#BBDEFF] rounded-lg flex shrink-0 justify-center items-center">
          <Image src="/list.svg" width={52} height={52} alt="companionPic" className="rounded-lg" />
        </div>

        <div className="h-full flex flex-col gap-2 justify-between">
          <div>
            <span className="text-[16px] text-bold">{info.hospital}</span>
            <p className="text-[#092543] text-[12px]">{info.message}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-bold text-[12px]">{`${calcTime(Number(info.startTime), true)} - ${calcTime(Number(info.endTime), true)}`}</span>
          </div>
        </div>
      </div>
      {
        whichIcon(info.isCompleted, info.endTime)
      }
    </div>
  )
}
export default ListItem