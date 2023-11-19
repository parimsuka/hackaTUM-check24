import classNames from "classnames";
import Link from "next/link";


export type NavbarElement = { text: string, isActive?: boolean, href: string }

const NavBarItem = ({text, isActive, href}: NavbarElement) => {
  return (
    <li className={classNames('font-medium text-xl', !isActive ? 'text-text-secondary' : 'text-button-main')}>
      <Link href={href}>{text}</Link>
    </li>
  )
}

export default NavBarItem
