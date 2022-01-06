import {  ACESFilmicToneMapping, AmbientLight, DefaultLoadingManager, Group, Mesh, MeshPhysicalMaterial, PCFSoftShadowMap, PerspectiveCamera, PMREMGenerator, PointLight, PointLightHelper, Scene, SpotLight, SpotLightHelper, Texture, TextureLoader, UnsignedByteType, Vector2, Vector3, WebGLCubeRenderTarget, WebGLRenderer, WebGLRenderTarget } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { CanvasSize } from "./JSRender"
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { threadId } from "worker_threads";
import { group } from "console";

const HDRIParameter = {
    exposure: 1.0
}

const PressDownAmount = {
    Amount: -0.005
}

export class KeychronQ2Render {
    private canvas: HTMLElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    windowsize: CanvasSize

    controls: OrbitControls

    composer: EffectComposer

    renderPass: RenderPass
    
    bloompass: UnrealBloomPass

    KeyChronQ2Model: Group

    exrCubeRenderTarget: WebGLRenderTarget
    exrBackground: Texture

    isPress = {
        F: false,
        A: false
    }

    constructor(canvas: HTMLElement) {
        this.canvas = canvas
        this.windowsize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.init()
        this.UpdateRender()
        window.addEventListener('resize', this.windowResize)
        window.addEventListener('keypress', this.KeyPress)
        window.addEventListener('keyup', this.KeyUp)
    }

    KeyPress = Key => {
        //console.log(Key)
        const name = Key.key
        const code = Key.code
        //console.log("Code is " + code)
        if(code === 'KeyF')
        {
            console.log("Press KeyF")
            console.log(this.KeyChronQ2Model)
            this.KeyChronQ2Model.traverse(geo => 
            {
                if(geo instanceof Mesh)
                {
                    if(geo.name === "Key_F" && !this.isPress.F)
                    {
                        geo.getObjectByName("Key_F").position.y = geo.getObjectByName("Key_F").position.y + PressDownAmount.Amount 
                        this.isPress.F = true
                    }          
                }
            })
        }
    }
        
    
    KeyUp = Key => {
        const name = Key.key
        const code = Key.code
        //console.log("Code is " + code)
        if(code === 'KeyF')
        {
            console.log("Press KeyF")
            console.log(this.KeyChronQ2Model)
            this.KeyChronQ2Model.traverse(geo => 
            {
                if(geo instanceof Mesh)
                {
                    if(geo.name === "Key_F")
                    {
                        geo.getObjectByName("Key_F").position.y = geo.getObjectByName("Key_F").position.y - PressDownAmount.Amount 
                        this.isPress.F = false
                    }          
                }
            })
        }
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
        this.renderer = new WebGLRenderer({canvas:this.canvas, antialias: true})
        this.renderer.setSize(this.windowsize.width,this.windowsize.height)
        this.renderer.toneMapping = ACESFilmicToneMapping
        this.renderer.toneMappingExposure = HDRIParameter.exposure
        this.renderer.physicallyCorrectLights = true
        this.renderer.shadowMap.type = PCFSoftShadowMap
        this.renderer.shadowMap.enabled = true
        //this.renderer.shadowMap.autoUpdate = true

        this.scene = new Scene()
        this.camera = new PerspectiveCamera(50,this.windowsize.width/this.windowsize.height,0.001,1000000)
        this.camera.position.set(0,4,5)
        this.camera.lookAt(0,0,0)

        /**
         * Post Processing
         */
        this.composer = new EffectComposer(this.renderer)
        this.composer.setSize(this.windowsize.width, this.windowsize.height)

        this.renderPass = new RenderPass(this.scene,this.camera)
        this.bloompass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 5, 1, 0.8)
        
        this.composer.addPass(this.renderPass)
        this.composer.addPass(this.bloompass)

        // controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update()

        // // TextureLoader
        // const texture = new TextureLoader()
        // const T_debug = texture.load('ash_uvgrid01.jpg')


        /**
         *  Load HDRI
         */
        // let pmrem: PMREMGenerator = new PMREMGenerator(this.renderer)
        // pmrem.compileCubemapShader()

        // const _RBGELoader = new RGBELoader()
        // _RBGELoader.setDataType(UnsignedByteType)
        // _RBGELoader.load('countyard.exr', HDRI =>{
            
        //     const envMap: WebGLRenderTarget = pmrem.fromEquirectangular(HDRI)
        //     HDRI.dispose()
        //     pmrem.dispose()
        //     this.scene.environment = envMap.texture

        //     this.scene.background = envMap.texture
        //     //this.scene.environment = envMap.texture
        // })
        
        // const cubemap = new CubeTextureLoader()
        // cubemap.load(['TropicalRuins_Env.hdr'], cubemap =>{
        //     const lightProbe = new LightProbe()
        //     lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubemap))
        //     //lightProbe.intensity = 100
        //     this.scene.add(lightProbe)
        // }) 
        
        /**
         *  Load HDRI EXR
         */
        let pmrem: PMREMGenerator = new PMREMGenerator(this.renderer)
        
        const _EXRLoader = new EXRLoader()
        _EXRLoader.load('courtyard.exr', EXR => {
            //console.log(EXR)
            this.exrCubeRenderTarget = pmrem.fromEquirectangular(EXR)
            this.exrBackground = this.exrCubeRenderTarget.texture
        })
        
        pmrem.compileEquirectangularShader()
        
        //this.scene.background = this.exrBackground

        const gui = new GUI()
        gui.add(HDRIParameter,'exposure', 0 , 4 , 0.01).onChange(this.UpdateRender);


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
        const PointLight1: PointLight = new PointLight( 0xffffff, 5, 100 )
        PointLight1.castShadow = true
        PointLight1.position.set(3,3,3)
        this.scene.add(PointLight1)
        const PointLight1Helper = new PointLightHelper(PointLight1)
        //this.ListPointLightsHelper[0] = PointLight1Helper
        this.scene.add(PointLight1Helper)

        const spotlight1 = new SpotLight( 0xffffff, 200, 20 )
        spotlight1.angle = Math.PI / 4
        spotlight1.position.set(3,15,0)
        spotlight1.lookAt(0,0,0)
        spotlight1.castShadow = true
        spotlight1.shadow.camera.near = 1
        spotlight1.shadow.camera.far = this.camera.far
        spotlight1.shadow.focus = 1
        spotlight1.shadow.mapSize.set(1024,1024)
        this.scene.add(spotlight1)

        const spotlight1Helper = new SpotLightHelper(spotlight1)
        this.scene.add(spotlight1Helper)

        const ambientLight = new AmbientLight(0x404040)
        ambientLight.intensity = 5
        this.scene.add(ambientLight)

        // GLTF Loader
        const gltfLoader = new GLTFLoader()
        gltfLoader.load( 'Q2_Model_WIP6.glb', s01 => {
            const model = s01.scene
            model.scale.set(20,20,20)
            model.traverse(geo => {

                if(geo instanceof Group)
                {
                    this.KeyChronQ2Model = geo
                }

                if(geo instanceof Mesh)
                {
                    console.log(geo.name)
                    // if(geo.name != "Mushroom_Quad")
                    // {
                    //     geo.receiveShadow = true
                    // }
                    // else
                    // {
                    //     const newMat: MeshPhysicalMaterial = new MeshPhysicalMaterial({map:geo.material.map})
                    //     geo.material = newMat
                    //     geo.material.roughness  = .8
                    //     geo.material.metalness = .1
                    //     geo.material.emissiveIntensity = 10
                    // }

                    // geo.castShadow = true


                    // console.log(geo.material)
                    
                    const newMat: MeshPhysicalMaterial = new MeshPhysicalMaterial({map:geo.material.map})
                    geo.material = newMat
                    geo.material.roughness = 0.5
                    geo.material.spacular = .8
                    geo.material.matalness = .9

                    geo.material.envMap = this.exrCubeRenderTarget
                }
            })
            //model.receiveShadow = true
            //model.castShadow = true
            //model.scale.set(0.01,0.01,0.01)
            this.scene.add(model)
        })

    }

    UpdateRender = () => {
        requestAnimationFrame(this.UpdateRender)

        this.controls.update()

        this.renderer.render(this.scene,this.camera)

        this.composer.render()
    }
}