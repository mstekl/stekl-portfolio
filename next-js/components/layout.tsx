import Link from "next/link"
import { drupal } from "lib/drupal"
import { PreviewAlert } from "components/preview-alert"
import { getMenu } from "lib/menu"
import { useEffect, useState } from "react"
import Header from "./header"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { DrupalMenuLinkContent } from "next-drupal"

export function Layout({ children }) {
  const router = useRouter();

  
  const [menuItems, setMenuItems] = useState<{menu: DrupalMenuLinkContent[]; items: DrupalMenuLinkContent[]}>({menu: [], items: []});

  useEffect(() => {
    async function fetchMenu() {
      const mainMenuItems = await getMenu("main")
      setMenuItems(mainMenuItems)
    }

    fetchMenu()
  }, []);

  

  return (
    <>
      <PreviewAlert />
      <div className="flex flex-col min-h-screen text-gray-900">
        
        <Header menuItems={menuItems} />
        
        <motion.main 
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{
            type: "twin",
            ease: "easeOut"
          }}
          className="flex flex-1 justify-center h-full w-screen transform-gpu z-30"
          onAnimationComplete={ () => {document.body.style.overflow = 'auto';} }
          onAnimationStart={ () => {document.body.style.overflow = 'hidden';} }
        >
          {children}
        </motion.main>
      </div>
    </>
  )
}
