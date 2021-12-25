import { MutableRefObject, useEffect, useRef } from "react"
import { FBXSceneLighting } from "../src/FBXSceneLighting"

const FBXSceneLightingPage = () => {

    const canvas: MutableRefObject <HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        document.title = "FBXSceneLighting",
        new FBXSceneLighting(canvas.current)
    },[])

    return(
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

            <canvas ref= { canvas}></canvas>

        </>
    )
}

export default FBXSceneLightingPage
