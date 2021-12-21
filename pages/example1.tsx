import { MutableRefObject, useEffect, useRef } from "react"
import { Example1_Canvas } from "../src/example1Render"

const example1 = () => {

    const canvas: MutableRefObject <HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      document.title = "example1",
      new Example1_Canvas(canvas.current)
    },[])

    return (
			<>
			<style jsx global>{`
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				canvas {
					display: block;
				}
			`}</style>

			<canvas ref={ canvas } />

			</>
      )
    }
  
export default example1


// <>
// <h1>Hello World</h1>
// <canvas ref={canvas}></canvas>
// </>
//<canvas id="WebGL_example1"></canvas>

//<canvas ref={ canvas } />