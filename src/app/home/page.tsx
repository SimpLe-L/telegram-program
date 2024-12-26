import AMap from "@/components/map-component"
import HospitalCard from "./components/card"
import Link from "next/link"
import { hospitals } from "@/data"

const HomePage = () => {

  return (
    <div className="h-dvh pb-7 flex flex-col">
      <div className="min-h-[300px]">
        <AMap />
      </div>
      {/* <DynamicMap /> */}
      <div className="flex flex-1 flex-col mt-4 gap-2 px-7">
        <div className="flex flex-col gap-1">
          <span className="text-[20px] font-bold">Near by Hospital</span>
          <p className="text-sm text-[#092543]">find all hospital, click to get detail informations</p>
        </div>
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
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