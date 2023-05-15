import React from "react"
import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"

type HeaderProps = {
    menuItems: DrupalMenuLinkContent[]
}

const Header = ({menuItems}) => {
    // console.log(menuItems.items);
    
    return <header>
        <div className="container flex items-center justify-between py-6 mx-auto">
        <Link href="/" className="text-4xl font-black text-slate-500 no-underline hover:text-slate-900 transition-colors ease-out duration-500">
            MS
        </Link>
        <ul className="flex">
        { menuItems.items && menuItems.items.map((item) => {
            console.log(item)
            return <li className="px-4" key={item.id}>
                <Link href={item.url}>{item.title}</Link>
                </li>
        })}
        </ul>
        </div>
  </header>
    
}


export default Header;