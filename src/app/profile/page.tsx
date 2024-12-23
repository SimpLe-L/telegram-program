import BackIcon from "@/components/back-header/back-icon";
import { Cake, Mail, PhoneCall, UserRound } from "lucide-react";
import Image from "next/image";
import ListItem from "./list-item";
import Link from "next/link";

const OrderList = [
  {
    icon: "/hospital.svg",
    id: "escort01",
    name: "susan",
    introduction: "familiar with neurosurgery",
    start: "2024-12-20 09:00",
    end: "2024-12-20 12:00",
    hospital: "hospital01",
  },
  {
    icon: "/hospital.svg",
    id: "escort02",
    name: "lisi",
    introduction: "familiar with cardiology",
    start: "2024-12-20 09:00",
    end: "2024-12-20 18:00",
    hospital: "hospital02",
  },
]

const Profile = () => {
  return (
    <div className="min-h-dvh bg-[--btn-color] flex flex-col relative pb-7">
      <div className="absolute left-[30px] top-[30px]">
        <BackIcon iconColor={false} />
      </div>

      <div className="flex justify-center w-full">
        <div className="w-[138px] h-[200px] rounded-b-[70px] bg-[--bg-profile] flex justify-center items-end pb-7">
          <div className="size-[90px] rounded-full flex justify-end items-end border bg-red">
            <Image src="/camera.svg" width={26} height={26} alt="pick" />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[30px] mt-5 gap-3">
        <span className="text-2xl font-bold text-white">Hello~</span>
        <span className="text-2xl font-bold text-white">Zhang San</span>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="flex gap-2 items-center">
            <Cake className="text-white" />
            <span className="text-white font-semibold text-[16px]">1920-11-04</span>
          </div>
          <div className="flex gap-2 items-center">
            <PhoneCall className="text-white" />
            <span className="text-white font-semibold text-[16px]">18255559999</span>
          </div>
          <div className="flex gap-2 items-center">
            <UserRound className="text-white" />
            <span className="text-white font-semibold text-[16px]">Male</span>
          </div>
          <div className="flex gap-2 items-center">
            <Mail className="text-white" />
            <span className="text-white font-semibold text-[16px]">3290111@qq.com</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10 px-[30px]">
        <span className="text-2xl font-bold text-white">Order List</span>
        {
          OrderList.map((info, index) => (
            <Link href={`/order-detail/${info.id}`} key={index}>
              <ListItem key={index} info={info} />
            </Link>
          ))
        }
      </div>
    </div>
  )
}
export default Profile