import Image from "next/image";
import check24 from "@/assets/check-24.png";

export default function Navbar() {
  return (
    <div className="bg-background h-f w-[17rem]">
      <div className="ml-12 pt-40">
        <Image
          src={check24}
          alt={'check24 logo'}
        />
        <ul className="mt-24 grid grid-cols-1 gap-y-10">
          <li className="font-medium">
            Address
          </li>
          <li className="font-medium">
            Search
          </li>
          <li className="mt-24 font-medium">
            Go Back
          </li>
        </ul>
      </div>
    </div>
  )
}
