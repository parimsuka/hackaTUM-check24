"use client"
import Image from "next/image";
import check24 from "@/assets/check-24.png";
import NavbarItem, {NavbarElement} from "@/components/NavbarItem";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";


export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const paths: NavbarElement[] = [{href: '/', text: 'Address'}, {href: '/search', text: 'Search'}];
  const hasGoBack = pathname !== paths[0].href
  return (
    <div className="bg-background flex flex-col justify-around pl-12 pt-20 h-full">
        <Image
          src={check24}
          alt={'check24 logo'}
        />
        <ul className="grid grid-cols-1 gap-y-10">
          {
            paths.map((path) => {
              return (<NavbarItem text={path.text} href={path.href} key={path.href} isActive={path.href === pathname}/>)
            })
          }
        </ul>
        <h6 className={'cursor-pointer font-semibold'} onClick={() => hasGoBack ? router.back() : null}>{ hasGoBack ? 'Go back' : 'Made with Code' }</h6>
    </div>
  )
}
