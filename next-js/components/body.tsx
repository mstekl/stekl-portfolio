import { Element, HTMLReactParserOptions } from "html-react-parser";
import parse from 'html-react-parser';

import Image from "next/image";

const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // Look for an img tag and replace it with Image.
      if (domNode instanceof Element && domNode.name === "img") {
        console.log("NODE ATRIBS", domNode.attribs);

        const { src, alt } = domNode.attribs
  
        const w = Number(domNode.attribs.width)
        const h = Number(domNode.attribs.height)

        if(!Number.isNaN(w))
            return <Image
                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${src}`}
                    width={w}
                    height={h}
                    alt={alt}
            />
        else
            return <div className="relative h-32" >
                <Image
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${src}`}
                        fill={true}
                        className="object-contain"
                        alt={alt}
                /></div>
      }
    },
  }
  
  export function Body({ value }: { value: string }) {
    return <>{parse(value, options)}</>
  }