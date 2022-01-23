// import { MutableRefObject, useEffect, useRef } from "react"
// import { Example1_Canvas } from "../src/example1Render"
// import { JSRender } from "../src/JSRender"
// import example1 from "./example1"

// const Index = () => {

//     useEffect(() => {
//       document.title = "Render"
//       new JSRender
//     },[])
  
//     return (
//         <>
//         <canvas id="WebGL"></canvas>
//         <button><a href='/example1'>Example1</a></button>
//         </>
//       )
//   }
  
//   export default Index

import { MutableRefObject, useEffect, useRef } from "react"
import { KeychronQ2Render } from "../src/KeychronQ2Render"

const KeychronQ2RenderPage = () => {

    const canvas: MutableRefObject <HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        document.title = "KeychronQ2",
        new KeychronQ2Render(canvas.current)
        //document.body.style.backgroundColor = "Red"
        //document.body.style.backgroundColor = "transparent"
        //document.body.style.opacity = "0"
    },[])

    return(
        <>

			{ <style jsx global>{`
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				canvas {
					display: block;
				}
			`}</style> }

            <canvas ref= { canvas}></canvas>

        </>
    )
}

export default KeychronQ2RenderPage