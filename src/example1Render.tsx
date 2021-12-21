import { Mesh, MeshPhysicalMaterial, PerspectiveCamera, Plane, PlaneGeometry, PointLight, Scene, SphereGeometry, TextureLoader, WebGLRenderer } from "three"
import { CanvasSize } from "./JSRender"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"

export class Example1_Canvas {

    private canvas: HTMLElement
    private render: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    widowsize: CanvasSize

    constructor(canvas: HTMLElement) {
        //this.canvas = document.getElementById("WebGL_example1")
        this.canvas = canvas
        this.widowsize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.init()
        this.UpdateRender()
        window.addEventListener('resize', this.windowResize)
    }

    windowResize = () => {
        this.widowsize.width = window.innerWidth
        this.widowsize.height = window.innerHeight

        this.camera.aspect = this.widowsize.width/this.widowsize.height
        this.camera.updateProjectionMatrix()

        this.render.setSize(this.widowsize.width, this.widowsize.height)
    }

    init (){
        this.render = new WebGLRenderer({canvas:this.canvas})
        this.render.setSize(this.widowsize.width,this.widowsize.height)
        this.render.shadowMap.enabled = true

        this.scene = new Scene()
        this.camera = new PerspectiveCamera(50,this.widowsize.width/this.widowsize.height,0.1,100)
        this.camera.position.set(0,4,5)
        this.camera.lookAt(0,0,0)

        const texture = new TextureLoader()
        const T_debug = texture.load('ash_uvgrid01.jpg')
        const T_Floor_Col = texture.load('T_Floor_Col.jpg')
        const T_Floor_N = texture.load('T_Floor_N.jpg')
        const T_Floor_R = texture.load('T_Floor_Roughness.jpg')

        const loader = new OBJLoader()

        loader.load("book.obj", addBookObj => {
            addBookObj.scale.set(0.1,0.1,0.1)
            addBookObj.position.set(2,1,0)
            this.scene.add(addBookObj)
       })
       
        const SphereRadius: number = 1
        const Sphere: Mesh = new Mesh(new SphereGeometry(SphereRadius,32,16),
             new MeshPhysicalMaterial({
                map: T_debug,
                specularIntensity: 1,
                roughness: .3
                }))
        Sphere.castShadow = true
        Sphere.position.y = SphereRadius
        this.scene.add(Sphere)

        const Ground: Mesh = new Mesh(new PlaneGeometry(10,10),
                             new MeshPhysicalMaterial({
                                map: T_Floor_Col,
                                normalMap: T_Floor_N,
                                roughnessMap: T_Floor_R,
                                specularIntensity: 1,
                                metalness: 1
                                }))
        Ground.receiveShadow = true
        Ground.rotation.x = -Math.PI/2
        this.scene.add(Ground)

        const PointLight1: PointLight = new PointLight( 0xffffff, 1, 100 )
        PointLight1.castShadow = true
        PointLight1.position.set(3,3,3)
        this.scene.add(PointLight1)
    }

    UpdateRender = () => {
        requestAnimationFrame(this.UpdateRender)
        this.render.render(this.scene,this.camera)
    }

}