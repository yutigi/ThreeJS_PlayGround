import THREE, {
    Group,
	Mesh,
	MeshPhysicalMaterial, 
	PerspectiveCamera,  
	PlaneGeometry, 
	PointLight, 
	Scene, 
	SphereGeometry, 
	TextureLoader, 
	WebGLRenderer 
	} from "three"
import { CanvasSize } from "./JSRender"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { emit } from "process"
import { threadId } from "worker_threads"
import { degToRad, radToDeg, randFloat } from "three/src/math/MathUtils"

export class Example1_Canvas {

    private canvas: HTMLElement
    private render: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    widowsize: CanvasSize

    controls: OrbitControls

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
        this.camera = new PerspectiveCamera(50,this.widowsize.width/this.widowsize.height,0.1,100000000)
        this.camera.position.set(0,4,5)
        this.camera.lookAt(0,0,0)

        // controls
        this.controls = new OrbitControls( this.camera, this.render.domElement );
        this.controls.keys = {
            LEFT: 'ArrowLeft', //left arrow
            UP: 'ArrowUp', // up arrow
            RIGHT: 'ArrowRight', // right arrow
            BOTTOM: 'ArrowDown' // down arrow
        }
        this.controls.update()

        // TextureLoader
        const texture = new TextureLoader()
        const T_debug = texture.load('ash_uvgrid01.jpg')
        const T_Floor_Col = texture.load('T_Floor_Col.jpg')
        const T_Floor_N = texture.load('T_Floor_N.jpg')
        const T_Floor_R = texture.load('T_Floor_Roughness.jpg')

        const T_MagicMushroom_Col = texture.load('MagicMushroom/T_Mushroom_Col_4.png')
        const T_MagicMushroom_Emissive = texture.load('MagicMushroom/T_Mushroom_Emissive.png')

        const MagicMushroomMat = new MeshPhysicalMaterial({
            map: T_MagicMushroom_Col,
            emissiveMap: T_MagicMushroom_Emissive,
            emissiveIntensity: 1
        })
        
        // OBJ Loader
        const objLoader = new OBJLoader()

    //     objLoader.load("book.obj", addBookObj => {
    //         addBookObj.scale.set(0.1,0.1,0.1)
    //         addBookObj.position.set(2,1,0)
    //         addBookObj.castShadow = true
    //         this.scene.add(addBookObj)
    //    })

        // FBX Loader
        const fbxLoader = new FBXLoader() 

        fbxLoader.load("MagicMushroom/SM_Magic_Mushroom01.fbx", MagicMushroom => {
            MagicMushroom.position.set(-1,0,0)
            MagicMushroom.rotateX(-Math.PI/2)
            MagicMushroom.scale.set(0.0001,0.0001,0.0001)
            MagicMushroom.castShadow = true
            MagicMushroom.traverse( child =>{
                if(child instanceof Mesh)
                {
                    child.material = MagicMushroomMat
                }
            })
            //this.scene.add(MagicMushroom)
            const spawmCount = 10
            const randomPos = 4
            for (let index = 0; index < spawmCount; index++) {
                const m1 = MagicMushroom.clone()
                m1.position.set(randFloat(-randomPos,randomPos),0,randFloat(-randomPos,randomPos))
                m1.rotateZ(degToRad(randFloat(0,360)))
                m1.castShadow = true
                m1.receiveShadow = true
                this.scene.add(m1)
            }
        })

       
        // const SphereRadius: number = 1
        // const Sphere: Mesh = new Mesh(new SphereGeometry(SphereRadius,32,16),
        //      new MeshPhysicalMaterial({
        //         map: T_debug,
        //         specularIntensity: 1,
        //         roughness: .3
        //         }))
        // Sphere.castShadow = true
        // Sphere.position.y = SphereRadius
        // this.scene.add(Sphere)

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

        this.controls.update()

        this.render.render(this.scene,this.camera)
    }

}