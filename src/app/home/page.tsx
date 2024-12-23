import AMap from "@/components/map-component"
import { IHospital } from "@/types"
import HospitalCard from "./components/card"
import Link from "next/link"

const hospitals: IHospital[] = [
  {
    name: "华西医院",
    id: "1",
    icon: "/hospital.svg",
    introduction: "综合性医院",
    review: 700,
    score: 4.5,
    level: "A"
  },
  {
    name: "空军总医院",
    id: "2",
    icon: "/hospital.svg",
    introduction: "综合性医院",
    review: 500,
    score: 4.2,
    level: "B"
  },
  {
    name: "传染病医院",
    id: "3",
    icon: "/hospital-two.svg",
    introduction: "传染病",
    review: 100,
    score: 3.4,
    level: "C",

  }
]

const HomePage = () => {

  const jumpDetail = () => {
    console.log("jump detail")
  }

  return (
    <div className="h-dvh">
      <AMap />
      {/* <div className="w-full h-[400px]"></div> */}
      <div className="flex flex-col mt-4 gap-2 px-7">
        <div className="flex flex-col gap-1">
          <span className="text-[20px] font-bold">Near by Hospital</span>
          <p className="text-sm text-[#092543]">find all hospital, click to get detail informations</p>
        </div>
        <div className="flex flex-col gap-3">
          {
            hospitals.map((item) => <Link href={`/hospital-detail/${item.id}`} key={item.id}>
              <HospitalCard info={item} />
            </Link>)
          }
        </div>
      </div>
    </div>
  )
}
export default HomePage