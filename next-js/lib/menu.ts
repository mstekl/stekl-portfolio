import { drupal } from "lib/drupal"
import { DrupalMenuLinkContent } from "next-drupal";

export async function getMenu(menuName:string) {
    try {
      
        const { items:menu, tree:items } = await drupal.getMenu<DrupalMenuLinkContent>(menuName);
        
        return { menu, items };
      } catch (error) {
        console.error("Error fetching menu:", error);
        return null;
      }
}