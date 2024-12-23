"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
// import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const BackIcon = ({ iconColor = true }: { iconColor?: boolean }) => {

  const router = useRouter()
  const [color, setColor] = useState("text-[--btn-color]")
  const backMethod = () => {
    router.back()
  }

  useEffect(() => {
    if (!iconColor) {
      setColor("text-white")
    }
  }, [])

  return (
    <div className="absolute left-0 size-10 border border-solid border-[#D5D5D5] rounded-[4px] flex justify-center items-center" onClick={backMethod}>
      <ChevronLeft className={cn("h-5 w-5", color)} />
    </div>
  )
}
export default BackIcon