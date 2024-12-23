import { IHospital } from "@/types"
import Image from "next/image"

type CardProps = {
  info: IHospital
}


const HospitalCard = ({ info }: CardProps) => {
  return (
    <div className="w-full p-4 flex justify-between items-start rounded-lg shadow-3xl">
      <div className="flex gap-3">
        <div className="w-[64px] h-[64px] bg-[#BBDEFF] rounded-lg flex shrink-0 justify-center items-center">
          <Image src={info.icon} width={52} height={52} alt="hospitalPic" className="rounded-lg" />
        </div>

        <div className="h-full flex flex-col gap-2 justify-between">
          <div>
            <span className="text-base text-bold">{info.name}</span>
            <p className="text-[#092543] text-[12px]">{info.introduction}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Image src="/star.svg" width={14} height={15} alt="star" />
              <span className="text-bold text-[12px]">{info.score}</span>
            </div>
            <div className="w-[1px] h-5 bg-black"></div>
            <span className="text-bold text-[12px]">{info.review} Reviews</span>
          </div>
        </div>
      </div>
      <div className="size-11 rounded-full bg-[--bg-green] flex flex-col justify-center items-center">
        <span className="text-bold text-[--btn-color]">{info.level}</span>
        {/* <span>{info.type}</span> */}
      </div>
    </div>
  )
}
export default HospitalCard