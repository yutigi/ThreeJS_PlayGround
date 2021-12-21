import { useEffect } from "react"
import { JSRender } from "../src/JSRender"

const Index = () => {

    useEffect(() => {
      document.title = "Render"
      new JSRender
    },[])
  
    return (
  
        <canvas id="WebGL"></canvas>
  
      )
  }
  
  export default Index