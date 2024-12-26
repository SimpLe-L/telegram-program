import { ICompanion } from "@/types"
import Image from "next/image"

type CardProps = {
  info: ICompanion
}

const CompanionCard = ({ info }: CardProps) => {

  return (
    <div className="w-full p-4 flex justify-between items-start rounded-lg shadow-3xl">
      <div className="flex gap-3">
        <div className="w-[64px] h-[64px] rounded-lg flex shrink-0 justify-center items-center overflow-hidden">
          <Image src={info.icon} width={52} height={52} alt="companionPic" className="rounded-lg overflow-hidden" />
        </div>

        <div className="h-full flex flex-col gap-2 justify-between">
          <div>
            <span className="text-base text-bold">{info.name}</span>
            <p className="text-[#092543] text-[12px]">{info.introduction}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Image src="/star.svg" width={14} height={15} alt="star" />
              <span className="text-bold text-[12px]">{info.rating}</span>
            </div>
            <div className="w-[1px] h-5 bg-black"></div>
            <span className="text-bold text-[12px]">{info.orderNum} Customer</span>
          </div>
        </div>
      </div>

      <div className="size-[42px] rounded-full bg-[--bg-green] flex justify-center items-center">{info.pricePerOrder}$</div>
    </div>
  )
}
export default CompanionCard