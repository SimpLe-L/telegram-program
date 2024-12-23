
import { cn } from "@/lib/utils"
import BackIcon from "./back-icon"

interface IHeader {
  title: string,
  color: string,
  iconColor?: boolean,
}
const BackHeader = ({ title, color, iconColor }: IHeader) => {

  return (
    <div className="flex w-full justify-center items-center relative h-10 px-[30px]">
      <BackIcon iconColor={iconColor} />
      <span className={cn("text-lg font-bold", color)}>{title}</span>
    </div>
  )
}
export default BackHeader