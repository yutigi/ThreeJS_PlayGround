import { MutableRefObject, useEffect, useRef } from "react"
import { Example1_Canvas } from "../src/example1Render"
import { JSRender } from "../src/JSRender"
import example1 from "./example1"

const Index = () => {

    useEffect(() => {
      document.title = "Render"
      new JSRender
    },[])
  
    return (
        <>
        <canvas id="WebGL"></canvas>
        <button><a href='/example1'>Example1</a></button>
        </>
      )
  }
  
  export default Index