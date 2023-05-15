import Link from "next/link"
import { drupal } from "lib/drupal"
import { PreviewAlert } from "components/preview-alert"
import { getMenu } from "lib/menu"
import { useEffect, useState } from "react"
import Header from "./header"

export function Layout({ children }) {

  const [menuItems, setMenuItems] = useState([]);

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
      <div className="max-w-screen px-6 mx-auto">
        
        <Header menuItems={menuItems} />
        
        <main className="bg-white py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
