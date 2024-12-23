import { IOrder } from "@/types"
import { Clock9 } from "lucide-react"
import Image from "next/image"

type CardProps = {
  info: IOrder
}

const ListItem = ({ info }: CardProps) => {
  return (
    <div className="w-full p-4 flex justify-between items-start rounded-lg shadow-3xl bg-white">
      <div className="flex gap-3">
        <div className="w-[64px] h-[64px] bg-[#BBDEFF] rounded-lg flex shrink-0 justify-center items-center">
          <Image src={info.icon} width={52} height={52} alt="companionPic" className="rounded-lg" />
        </div>

        <div className="h-full flex flex-col gap-2 justify-between">
          <div>
            <span className="text-[16px] text-bold">{info.name}</span>
            <p className="text-[#092543] text-[12px]">{info.hospital}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-bold text-[12px]">{`${info.start} - ${info.end}`}</span>
          </div>
        </div>
      </div>

      <Clock9 className="w-[24px] h-[24px] text-[#adadad]" />
    </div>
  )
}
export default ListItem