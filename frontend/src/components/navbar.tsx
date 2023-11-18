"use client"
import Image from "next/image";
import check24 from "@/assets/check-24.png";
import NavbarItem, {NavbarElement} from "@/components/NavbarItem";
import {usePathname, useRouter} from "next/navigation";
import Search from '@/assets/search.svg';
import Address from '@/assets/address.svg'
import {useMemo} from "react";


export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const paths: NavbarElement[] = [
    {
      href: '/',
      text: 'Address',
      Picture: Address,
    },
    {
      href: '/search',
      text: 'Search',
      Picture: Search
    }
  ];
  const currentIndex = useMemo(() => paths.findIndex(i => i.href === pathname), [pathname])
  const hasGoBack = pathname !== paths[0].href

  return (
    <div className="bg-background flex flex-col justify-around items-center h-full">
      <Image
        src={check24}
        alt={'check24 logo'}
      />
      <ul className="grid grid-cols-1 gap-y-10">
        {
          paths.map((path, index) => {
            return (
              <NavbarItem
                text={path.text}
                href={path.href}
                key={path.href}
                isActive={path.href === pathname}
                Picture={path.Picture}
                disabled={index > currentIndex}
              />)
          })
        }
      </ul>
      <div className={'h-50'}>
        <h6
          className={'cursor-pointer font-semibold text-xl transition-all duration-200 ease-in border ' +
            'border-transparent hover:border-b-text-main'}
          onClick={() => hasGoBack ? router.back() : null}>
          {hasGoBack ? 'Go back' : 'Made with Code'}
        </h6>
      </div>
    </div>
  )
}
