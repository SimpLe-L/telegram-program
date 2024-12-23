"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CompanionCard from "./card"
import Link from "next/link"

const companionTypes = [
  {
    id: "all",
    text: "All",
    icon: "/all.svg",
    bg: "bg-[#ffffff]"
  },
  {
    id: "cardiology",
    text: "Cardiology",
    icon: "/cardiology.svg",
    bg: "bg-[#BBDEFF]"
  },
  {
    id: "neurology",
    text: "Neurology",
    icon: "/neurology.svg",
    bg: "bg-[#FFCBCC]"
  },
]

const companionList = [
  {
    icon: "/hospital.svg",
    id: "escort01",
    name: "susan",
    introduction: "familiar with neurosurgery",
    customers: 10,
    score: 4.2
  },
  {
    icon: "/hospital.svg",
    id: "escort02",
    name: "lisi",
    introduction: "familiar with cardiology",
    customers: 50,
    score: 4.6
  },
]

const HospitalDetails = ({ params }: { params: { id: string } }) => {

  const [active, setActive] = useState(0);
  const router = useRouter()
  const backHome = () => {
    router.push("/home")
  }

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <section>
        <div className="w-full h-[270px] bg-[url('/hospital-detail.png')] bg-no-repeat bg-cover flex flex-col justify-between pt-7 relative">
          <div className="flex w-full justify-center items-center relative h-10">
            <div className="absolute left-[30px] size-10 border border-solid border-[#D5D5D5] rounded-[4px] flex justify-center items-center" onClick={backHome}>
              <Image src="/arrow.svg" width={6} height={12} alt="back" />
            </div>
            <span className="text-white text-lg font-bold">Hospitals Details</span>
          </div>
          <div className="absolute -bottom-[2px] w-full px-7 rounded-t-[30px] h-[58px] text-lg font-bold bg-background flex justify-start items-center">
            成都军区总医院
          </div>
        </div>
        <div className="flex flex-col gap-3 px-7">
          <div className="flex gap-2 h-10 justify-start items-center">
            <Image src="/position.svg" width={13} height={15} alt="position" />
            <span className="text-[--text-basic] text-sm">四川省成都市武侯区国学巷37号‌</span>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image src="/rating.svg" width={40} height={40} alt="rating" />
              <div className="flex flex-col justify-between">
                <span className="text-[--text-basic] text-base">Rating</span>
                <span className="text-[--text-basic] text-base">4.5 out of 5</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Image src="/service.svg" width={40} height={40} alt="rating" />
              <div className="flex flex-col justify-between">
                <span className="text-[--text-basic] text-base">Service</span>
                <span className="text-[--text-basic] text-base">24/7 Service</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">Overview</span>
            <p className="text-[#707070] text-[12px] py-4">The hospital is providing cardiology services by 2 modern cath-lab and round the clock CCU facility including cardiac surgery.</p>
          </div>
          <div className="w-full h-[1px] bg-[#E5E5EA]"></div>
        </div>
      </section>

      {/* Medical CompanionCard part */}
      <section className="flex-1 mt-4 px-7">
        <div className="flex flex-col">
          <span className="text-lg font-bold">Near by medical companion</span>
          <p className="text-[#707070] text-[12px]">choose your favorite medical companion and place your order.</p>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2">
            {
              companionTypes.map((item, index) => {
                return <div key={item.id} className={
                  cn(
                    "flex justify-center items-center gap-2 h-[40px] py-1 px-4 bg-[#F7F9FE] rounded-[30px]",
                    active === index && "bg-[--btn-color]"
                  )
                }
                  onClick={() => setActive(index)}
                >
                  <div className={
                    cn(
                      "w-[24px] h-[24px] rounded-full flex justify-center items-center",
                      item.bg
                    )
                  }>
                    <Image src={item.icon} width={14} height={14} alt="icon" className="rounded-full" />
                  </div>

                  <span className={cn("text-[--text-basic]", active === index && "text-white")}>{item.text}</span>
                </div>
              })
            }
          </div>

          <div className="flex flex-col">
            {
              companionList.map(item => <Link href={`/companion-detail/${item.id}`} key={item.id}>
                <CompanionCard info={item} />
              </Link>)
            }
          </div>
        </div>
      </section>
    </div>
  )
}
export default HospitalDetails