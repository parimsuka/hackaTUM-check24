import classNames from "classnames";
import Link from "next/link";
import {ReactNode} from "react";


export type NavbarElement = { text: string, isActive?: boolean, href: string, Picture?: () => ReactNode  }

const NavbarItem = ({text, isActive, href, Picture}: NavbarElement) => {
  return (
    <li className={classNames('font-medium text-xl', !isActive ? 'text-text-secondary' : 'text-button-main', 'flex flex-col items-center')}>
      <Link className={'flex flex-col items-center'} href={href}>
        { Picture && <div className={classNames('nav__svg-wrapper', isActive && 'active')}><Picture /></div>}
        <span className={'font-semibold'}>{text}</span>
      </Link>
    </li>
  )
}

export default NavbarItem
