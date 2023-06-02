import React from "react"
import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

type HeaderProps = {
    menuItems: DrupalMenuLinkContent[]
}

const Header = ({menuItems}) => {
    const router = useRouter();
    
    const [ selected, setSelected ] = useState(router.asPath);
    
    return <header  className="bg-gray-50 sticky top-0 max-w-screen w-screen mx-auto drop-shadow-sm z-10">
        <div className="container flex items-center justify-between py-6 mx-auto">
        <Link href="/" className=" text-4xl font-black text-slate-500 no-underline hover:text-slate-900 transition-colors ease-out duration-500">
            MS
        </Link>
        
        <nav><ul className="flex text-gray-700 space-x-4 relative">

        {selected === "/" && (
                <motion.div
                    className="absolute -bottom-4 left-0 right-0 h-px bg-slate-200 transition-colors"
                    layoutId="underline"
                    layout                    
                    ></motion.div>
            )}

        { menuItems.items && menuItems.items.map((item) => {
            return <motion.li 
                className="px-4 hover:text-black relative cursor-pointer" 
                key={item.url}
                onHoverStart={() => setSelected(item.url)}
                onHoverEnd={() => setSelected(router.asPath)}
                >
                    <Link href={item.url}>{item.title}</Link>
                    {selected.includes(item.url) && ( /* use includes to handle cases like highlighting Blog for the articles */
                        <motion.div
                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-slate-300 transition-colors"
                            layoutId="underline"
                            layout
                            ></motion.div>
                    )}
                </motion.li>

        })}
        </ul></nav>
        </div>
  </header>
    
}


export default Header;