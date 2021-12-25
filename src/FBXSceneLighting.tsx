import {  AmbientLight, CubeTextureLoader, LightProbe, Material, PerspectiveCamera, PMREMGenerator, PointLight, PointLightHelper, Scene, TextureLoader, Vector2, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { CanvasSize } from "./JSRender"

export class FBXSceneLighting {
    private canvas: HTMLElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    windowsize: CanvasSize

    controls: OrbitControls

    composer: EffectComposer

    constructor(canvas: HTMLElement) {
        this.canvas = canvas
        this.windowsize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.init()
        this.UpdateRender()
        window.addEventListener('resize', this.windowResize)
    }

    windowResize = () => {
        this.windowsize.width = window.innerWidth
        this.windowsize.height = window.innerHeight

        this.camera.aspect = this.windowsize.width/this.windowsize.height
        this.camera.updateProjectionMatrix()

        this.composer.setSize(this.windowsize.width, this.windowsize.height)

        this.renderer.setSize(this.windowsize.width, this.windowsize.height)
    }

    init() {
        this.renderer = new WebGLRenderer({canvas:this.canvas})
        this.renderer.setSize(this.windowsize.width,this.windowsize.height)
        this.renderer.physicallyCorrectLights = true
        this.renderer.shadowMap.enabled = true

        /**
         * Post Processing
         */
        const bloompass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5,0.4,0.85)
        bloompass.threshold = .8
        bloompass.strength = 10
        bloompass.radius = 1

        this.composer = new EffectComposer(this.renderer)
        this.composer.addPass(bloompass)

        this.scene = new Scene()
        this.camera = new PerspectiveCamera(50,this.windowsize.width/this.windowsize.height,0.001,1000000)
        this.camera.position.set(0,4,5)
        this.camera.lookAt(0,0,0)

        // controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update()

        // TextureLoader
        const texture = new TextureLoader()
        const T_debug = texture.load('ash_uvgrid01.jpg')

        /**
         *  Load HDRI
         */
        //let envmaploader = new PMREMGenerator(this.renderer)
        new RGBELoader().load('Ice_Lake_Env.hdr', HDRI =>{
            
            this.scene.background = HDRI
        })
        const cubemap = new CubeTextureLoader()
        cubemap.load(['Ice_Lake_Env.hdr'], cubemap =>{
            const lightProbe = new LightProbe()
            lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubemap))
            //lightProbe.intensity = 100
            this.scene.add(lightProbe)
        }) 
        

        /**
         * Default Sphere
         */
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

        /**
         *  Default Point Light
         */
        // const PointLight1: PointLight = new PointLight( 0xffffff, 5, 100 )
        // PointLight1.castShadow = true
        // PointLight1.position.set(3,3,3)
        // this.scene.add(PointLight1)
        // const PointLight1Helper = new PointLightHelper(PointLight1)
        // //this.ListPointLightsHelper[0] = PointLight1Helper
        // this.scene.add(PointLight1Helper)

        const ambientLight = new AmbientLight(0x404040)
        ambientLight.intensity = 100
        this.scene.add(ambientLight)


        // FBX Loader
        const fbxLoader = new FBXLoader() 
        fbxLoader.load("S01_Lighting.fbx", FBXImportedScene => {
            FBXImportedScene.castShadow = true
            //FBXImportedScene.scale.set(0.01,0.01,0.01)
            FBXImportedScene.traverse( child =>{
                // if(child instanceof Mesh)
                // {
                //     child.material = Mat
                // } 

                const lightIntensity = .1
                if(child instanceof PointLight)
                {
                    child.intensity *= lightIntensity // decrase light intensity
                    //this.scene.add(child)
                    
                    const pointlight = new PointLight()
                    pointlight.color = child.color
                    pointlight.intensity = child.intensity
                    pointlight.power = child.power
                    pointlight.castShadow = true
                    pointlight.position.set(child.position.x,child.position.y,child.position.z)
                    this.scene.add(pointlight)
                    
                    
                    const light_hepler = new PointLightHelper(child)
                    light_hepler.update()
                    this.scene.add(light_hepler)
                    
                }
                // if(child instanceof SpotLight)
                // {
                //     child.intensity *= lightIntensity // decrase light intensity
                //     this.scene.add(child)
                //     const light_hepler = new SpotLightHelper(child)
                //     light_hepler.update()
                //     this.scene.add(light_hepler)
                // }

                //this.scene.add(child)
                
            })
            //this.scene.add(FBXImportedScene)
        })

        // GLTF Loader
        const gltfLoader = new GLTFLoader()
        gltfLoader.load( 'S01.glb', s01 => {
            const model = s01.scene
            model.receiveShadow = true
            model.castShadow = true
            //model.scale.set(0.01,0.01,0.01)
            this.scene.add(model)
        })

    }

    UpdateRender = () => {
        requestAnimationFrame(this.UpdateRender)

        this.controls.update()

        this.composer.render()

        this.renderer.render(this.scene,this.camera)
    }
    
}