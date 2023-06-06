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

    const [ isMobileOpen, setIsMobileOpen] = useState(false);

    console.log(isMobileOpen)
    return (
        <header  className="bg-stone-50 sticky top-0 max-w-screen w-screen mx-auto drop-shadow-sm z-50">
            <nav className="container flex items-center justify-between px-4 md:px-0 py-6 mx-auto relative">
                <Link href="/" className=" text-4xl font-black text-slate-500 no-underline hover:text-slate-900 transition-colors ease-out duration-500">
                    MS
                </Link>
                
                <div className="absolute w-80 right-0 top-full bg-stone-50 md:relative md:w-auto md:top-0">
                    <ul 
                        className={`block text-gray-700 text-xl md:text-base  h-screen relative space-y-6 md:space-y-0 md:space-x-4 md:h-auto md:flex md:flex-wrap md:flex-row ${isMobileOpen ? "block" : "hidden"} `}
                    >

                        {selected === "/" && (
                                <motion.div
                                    className="absolute -top-6 bottom-auto left-4 w-0.5 md:w-full h-full md:h-px md:top-auto md:-bottom-4 md:left-0 md:right-0  bg-slate-200 transition-colors "
                                    layoutId="underline"
                                    layout                    
                                    ></motion.div>
                            )}

                        { menuItems.items && menuItems.items.map((item) => {
                            return <motion.li 
                                className="px-10 md:px-4 hover:text-stone-800 relative cursor-pointer" 
                                key={item.url}
                                onHoverStart={() => !isMobileOpen && setSelected(item.url)}
                                onHoverEnd={() => setSelected(router.asPath)}
                                >
                                    <Link href={item.url}>{item.title}</Link>
                                    {selected.includes(item.url) && ( /* use includes to handle cases like highlighting Blog for the articles */
                                        <motion.div
                                            className="absolute h-full w-0.5 left-4 top-0 md:w-full md:top-auto md:-bottom-2 md:left-0 right-0 md:h-0.5 bg-slate-300 transition-colors"
                                            layoutId="underline"
                                            layout
                                            ></motion.div>
                                    )}
                                </motion.li>

                        })}
                    </ul>
                </div>
                    <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-1/2 md:hidden">
                        <svg className="w-8 h-8 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </nav>
            
        </header>
    )
    
}


export default Header;