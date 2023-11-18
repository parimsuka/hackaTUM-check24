import classNames from "classnames";
import Link from "next/link";
import {ReactNode} from "react";


export type NavbarElement = { text: string, isActive?: boolean, href: string, Picture?: () => ReactNode, disabled?: boolean  }

const NavbarItem = ({text, isActive, href, Picture, disabled}: NavbarElement) => {
  return (
    <li className={classNames('font-medium text-xl', !isActive ? 'text-text-secondary' : 'text-button-main', 'flex flex-col items-center')}>
      <Link aria-disabled={disabled} className={classNames('flex flex-col items-center', disabled ? 'pointer-events-none' : '')} href={href}>
        { Picture && <div className={classNames('nav__svg-wrapper', isActive && 'active')}><Picture /></div>}
        <span className={'font-semibold'}>{text}</span>
      </Link>
    </li>
  )
}

export default NavbarItem
