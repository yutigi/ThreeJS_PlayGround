import { MutableRefObject, useEffect, useRef } from "react"
import { KeychronQ2Render } from "../src/KeychronQ2Render"

const KeychronQ2RenderPage = () => {

    const canvas: MutableRefObject <HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        document.title = "KeychronQ2",
        new KeychronQ2Render(canvas.current)
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

export default KeychronQ2RenderPage