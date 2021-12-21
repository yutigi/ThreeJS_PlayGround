import { DirectionalLight, Mesh, MeshPhysicalMaterial, PerspectiveCamera, PlaneGeometry, Scene, Sphere, SphereGeometry, WebGLRenderer } from "three"

export interface CanvasSize {
    width: number,
    height: number
}

export class JSRender {

    private canvas: HTMLElement
    private renderer: WebGLRenderer
    private Scene: Scene
    private Camera: PerspectiveCamera

    DisplayResolution: CanvasSize = {
        width: 800,
        height: 600
    }

    // const displaysize: CanvasSize = (800,600)

    constructor(){
        this.canvas = document.getElementById("WebGL")
        console.log(this.canvas)
        this.init()
    }

    init(){
        this.renderer = new WebGLRenderer({canvas:this.canvas})
        //this.renderer.setSize(800,600)
        this.renderer.setSize(this.DisplayResolution.width,this.DisplayResolution.height)
        this.renderer.shadowMap.enabled = true
        
        this.Scene = new Scene()
        
        const acpectratio:number = this.DisplayResolution.width / this.DisplayResolution.height
        this.Camera = new PerspectiveCamera(35,acpectratio,0.1,100)
        this.Camera.position.set(0,0,10)
        this.Camera.rotation.x = 0.1
        this.Scene.add(this.Camera)

        this.DrawGeometry()

        const RenderCoreLoop = () => {
            requestAnimationFrame(RenderCoreLoop)
            
            this.Animation()
            this.renderer.render(this.Scene,this.Camera)
        }
        RenderCoreLoop()
    }

    DrawGeometry(){
        
        const DrawSphere = () => {
            const SphereGEO = new SphereGeometry(1,32,16)
            const SphereMaterial = new MeshPhysicalMaterial({color:'white'})
            const SphereMesh = new Mesh(SphereGEO,SphereMaterial)
            SphereMesh.castShadow = true
            this.Scene.add(SphereMesh)
        }
        DrawSphere()

        const DrawPlane = (size:number) => {
            const PlaneGEO = new PlaneGeometry(size,size)
            const PlaneMaterial = new MeshPhysicalMaterial({color:'white'})
            const PlaneMesh = new Mesh(PlaneGEO,PlaneMaterial)
            PlaneMesh.receiveShadow = true
            this.Scene.add(PlaneMesh)
        }
        DrawPlane(10)

        const AddSkyLight = (x:number, y:number, z:number) => {
            const SkyLight = new DirectionalLight(0xffffff,0.5)
            SkyLight.position.set(x,y,x)
            SkyLight.castShadow = true
            SkyLight.shadow.mapSize.width = 1024
            SkyLight.shadow.mapSize.height = 1024
            this.Scene.add(SkyLight)
        }
        AddSkyLight(5,-3,0)
        AddSkyLight(5,5,5)
    }

    Animation(){
        // Do Animation
    }
}