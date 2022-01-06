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
        // layer 1
        Backquote: false,
        Digit1: false,
        Digit2: false,
        Digit3: false,
        Digit4: false,
        Digit5: false,
        Digit6: false,
        Digit7: false,
        Digit8: false,
        Digit9: false,
        Digit0: false,
        Minus: false,
        Equal: false,
        Backspace: false,

        // layer 2

        Q: false,
        W: false,
        E: false,
        R: false,
        T: false,
        Y: false,
        U: false,
        I: false,
        O: false,
        P: false,
        BracketLeft: false,
        BracketRight: false,
        Backslash: false,
        
        // layer 3
        A: false,
        S: false,
        D: false,
        F: false,
        G: false,
        H: false,
        J: false,
        K: false,
        L: false,
        Semicolon: false,
        Quote: false,
        Enter: false,

        // layer 4
        Z: false,
        X: false,
        C: false,
        V: false,
        B: false,
        N: false,
        M: false,
        Comma: false,
        Period: false,
        Slash: false,

        // layer 5
        Space: false
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

    KeyPressAction = (Key:string ,isPress:boolean) =>{
        this.KeyChronQ2Model.traverse(geo =>{
            if(geo instanceof Mesh)
            {
                if(geo.name === Key && !isPress)
                {
                    geo.getObjectByName(Key).position.y = geo.getObjectByName(Key).position.y + PressDownAmount.Amount 
                    isPress = true
                }          
            }
        })
    }
    KeyReleaseAction = (Key:string ,isPress:boolean) =>{
        this.KeyChronQ2Model.traverse(geo =>{
            if(geo instanceof Mesh)
            {
                if(geo.name === Key && !isPress)
                {
                    geo.getObjectByName(Key).position.y = geo.getObjectByName(Key).position.y - PressDownAmount.Amount 
                    isPress = false
                }          
            }
        })
    }

    KeyPress = Key => {
        console.log(Key)
        const name = Key.key
        const code = Key.code
        if(code === 'KeyF')
        {
            //console.log("Press KeyF")
            //console.log(this.KeyChronQ2Model)
            this.KeyPressAction("Key_F",this.isPress.F)
        }
        else if(code === 'KeyQ')
        {
            this.KeyPressAction("Key_Q",this.isPress.Q)
        }
        else if(code === 'KeyW')
        {
            this.KeyPressAction("Key_W",this.isPress.W)
        }
        else if(code === 'KeyE')
        {
            this.KeyPressAction("Key_E",this.isPress.E)
        }
        else if(code == "KeyR")
        {
            this.KeyPressAction("Key_R",this.isPress.R)
        }
        else if(code == "KeyT")
        {
            this.KeyPressAction("Key_T",this.isPress.T)
        }
        else if(code == "KeyY")
        {
            this.KeyPressAction("Key_Y",this.isPress.Y)
        }
        else if(code == "KeyU")
        {
            this.KeyPressAction("Key_U",this.isPress.U)
        }
        else if(code == "KeyI")
        {
            this.KeyPressAction("Key_I",this.isPress.I)
        }
        else if(code == "KeyO")
        {
            this.KeyPressAction("Key_O",this.isPress.O)
        }
        else if(code == "KeyP")
        {
            this.KeyPressAction("Key_P",this.isPress.Y)
        }
        else if(code == "BracketLeft")
        {
            this.KeyPressAction("Key_BracketLeft",this.isPress.BracketLeft)
        }
        else if(code == "BracketRight")
        {
            this.KeyPressAction("Key_BracketRight",this.isPress.BracketRight)
        }
        else if(code == "Backslash")
        {
            this.KeyPressAction("Key_Backslash",this.isPress.Backslash)
        }
        else if(code == "KeyA")
        {
            this.KeyPressAction("Key_A",this.isPress.A)
        }
        else if(code == "KeyS")
        {
            this.KeyPressAction("Key_S",this.isPress.S)
        }
        else if(code == "KeyD")
        {
            this.KeyPressAction("Key_D",this.isPress.D)
        }
        else if(code == "KeyG")
        {
            this.KeyPressAction("Key_G",this.isPress.G)
        }
        else if(code == "KeyH")
        {
            this.KeyPressAction("Key_H",this.isPress.H)
        }
        else if(code == "KeyJ")
        {
            this.KeyPressAction("Key_J",this.isPress.J)
        }
        else if(code == "KeyK")
        {
            this.KeyPressAction("Key_K",this.isPress.K)
        }
        else if(code == "KeyL")
        {
            this.KeyPressAction("Key_L",this.isPress.L)
        }
        else if(code == "Semicolon")
        {
            this.KeyPressAction("Key_;",this.isPress.Semicolon)
        }
        else if(code == "Quote")
        {
            this.KeyPressAction("Key_'",this.isPress.Quote)
        }
        else if(code == "Enter")
        {
            this.KeyPressAction("Key_Enter",this.isPress.Enter)
        }
        else if(code == "KeyZ")
        {
            this.KeyPressAction("Key_Z",this.isPress.Z)
        }
        else if(code == "KeyX")
        {
            this.KeyPressAction("Key_X",this.isPress.X)
        }
        else if(code == "KeyC")
        {
            this.KeyPressAction("Key_C",this.isPress.C)
        }
        else if(code == "KeyV")
        {
            this.KeyPressAction("Key_V",this.isPress.V)
        }
        else if(code == "KeyB")
        {
            this.KeyPressAction("Key_B",this.isPress.B)
        }
        else if(code == "KeyN")
        {
            this.KeyPressAction("Key_N",this.isPress.N)
        }
        else if(code == "KeyM")
        {
            this.KeyPressAction("Key_M",this.isPress.M)
        }
        else if(code == "Comma")
        {
            this.KeyPressAction("Key_<",this.isPress.Comma)
        }
        else if(code == "Period")
        {
            this.KeyPressAction("Key_>",this.isPress.Period)
        }
        else if(code == "Slash")
        {
            this.KeyPressAction("Key_Slash",this.isPress.Slash)
        }
        else if(code == "Digit1")
        {
            this.KeyPressAction("Key_1",this.isPress.Digit1)
        }
        else if(code == "Digit2")
        {
            this.KeyPressAction("Key_2",this.isPress.Digit2)
        }
        else if(code == "Digit3")
        {
            this.KeyPressAction("Key_3",this.isPress.Digit3)
        }
        else if(code == "Digit4")
        {
            this.KeyPressAction("Key_4",this.isPress.Digit4)
        }
        else if(code == "Digit5")
        {
            this.KeyPressAction("Key_5",this.isPress.Digit5)
        }
        else if(code == "Digit6")
        {
            this.KeyPressAction("Key_6",this.isPress.Digit6)
        }
        else if(code == "Digit7")
        {
            this.KeyPressAction("Key_7",this.isPress.Digit7)
        }
        else if(code == "Digit8")
        {
            this.KeyPressAction("Key_8",this.isPress.Digit8)
        }
        else if(code == "Digit9")
        {
            this.KeyPressAction("Key_9",this.isPress.Digit9)
        }
        else if(code == "Digit0")
        {
            this.KeyPressAction("Key_0",this.isPress.Digit0)
        }
        else if(code == "Minus")
        {
            this.KeyPressAction("Key_-",this.isPress.Minus)
        }
         else if(code == "Equal")
        {
            this.KeyPressAction("Key_=",this.isPress.Equal)
        }
        else if(code == "Backspace")
        {
            // console.log("backspace")
            // this.KeyPressAction("Key_Backspace",this.isPress.Backspace)
        }
        else if(code == "Space")
        {
            this.KeyPressAction("Key_Spacebar",this.isPress.Space)
        }
    }
        
    KeyUp = Key => {
        const name = Key.key
        const code = Key.code
        if(code === 'KeyF')
        {
           this.KeyReleaseAction("Key_F",this.isPress.F) 
        }
        else if(code === 'KeyQ')
        {
            this.KeyReleaseAction("Key_Q",this.isPress.Q)
        }
        else if(code === 'KeyW')
        {
            this.KeyReleaseAction("Key_W",this.isPress.W)
        }
        else if(code === 'KeyE')
        {
            this.KeyReleaseAction("Key_E",this.isPress.E)
        }
        else if(code == "KeyR")
        {
            this.KeyReleaseAction("Key_R",this.isPress.R)
        }
        else if(code == "KeyT")
        {
            this.KeyReleaseAction("Key_T",this.isPress.T)
        }
        else if(code == "KeyY")
        {
            this.KeyReleaseAction("Key_Y",this.isPress.Y)
        }
        else if(code == "KeyU")
        {
            this.KeyReleaseAction("Key_U",this.isPress.U)
        }
        else if(code == "KeyI")
        {
            this.KeyReleaseAction("Key_I",this.isPress.I)
        }
        else if(code == "KeyO")
        {
            this.KeyReleaseAction("Key_O",this.isPress.O)
        }
        else if(code == "KeyP")
        {
            this.KeyReleaseAction("Key_P",this.isPress.Y)
        }
        else if(code == "BracketLeft")
        {
            this.KeyReleaseAction("Key_BracketLeft",this.isPress.BracketLeft)
        }
        else if(code == "BracketRight")
        {
            this.KeyReleaseAction("Key_BracketRight",this.isPress.BracketRight)
        }
        else if(code == "Backslash")
        {
            this.KeyReleaseAction("Key_Backslash",this.isPress.Backslash)
        }
        else if(code == "KeyA")
        {
            this.KeyReleaseAction("Key_A",this.isPress.A)
        }
        else if(code == "KeyS")
        {
            this.KeyReleaseAction("Key_S",this.isPress.S)
        }
        else if(code == "KeyD")
        {
            this.KeyReleaseAction("Key_D",this.isPress.D)
        }
        else if(code == "KeyG")
        {
            this.KeyReleaseAction("Key_G",this.isPress.G)
        }
        else if(code == "KeyH")
        {
            this.KeyReleaseAction("Key_H",this.isPress.H)
        }
        else if(code == "KeyJ")
        {
            this.KeyReleaseAction("Key_J",this.isPress.J)
        }
        else if(code == "KeyK")
        {
            this.KeyReleaseAction("Key_K",this.isPress.K)
        }
        else if(code == "KeyL")
        {
            this.KeyReleaseAction("Key_L",this.isPress.L)
        }
        else if(code == "Semicolon")
        {
            this.KeyReleaseAction("Key_;",this.isPress.Semicolon)
        }
        else if(code == "Quote")
        {
            this.KeyReleaseAction("Key_'",this.isPress.Quote)
        }
        else if(code == "Enter")
        {
            this.KeyReleaseAction("Key_Enter",this.isPress.Enter)
        }
        else if(code == "KeyZ")
        {
            this.KeyReleaseAction("Key_Z",this.isPress.Z)
        }
        else if(code == "KeyX")
        {
            this.KeyReleaseAction("Key_X",this.isPress.X)
        }
        else if(code == "KeyC")
        {
            this.KeyReleaseAction("Key_C",this.isPress.C)
        }
        else if(code == "KeyV")
        {
            this.KeyReleaseAction("Key_V",this.isPress.V)
        }
        else if(code == "KeyB")
        {
            this.KeyReleaseAction("Key_B",this.isPress.B)
        }
        else if(code == "KeyN")
        {
            this.KeyReleaseAction("Key_N",this.isPress.N)
        }
        else if(code == "KeyM")
        {
            this.KeyReleaseAction("Key_M",this.isPress.M)
        }
        else if(code == "Comma")
        {
            this.KeyReleaseAction("Key_<",this.isPress.Comma)
        }
        else if(code == "Period")
        {
            this.KeyReleaseAction("Key_>",this.isPress.Period)
        }
        else if(code == "Slash")
        {
            this.KeyReleaseAction("Key_Slash",this.isPress.Slash)
        }
        else if(code == "Digit1")
        {
            this.KeyReleaseAction("Key_1",this.isPress.Digit1)
        }
        else if(code == "Digit2")
        {
            this.KeyReleaseAction("Key_2",this.isPress.Digit2)
        }
        else if(code == "Digit3")
        {
            this.KeyReleaseAction("Key_3",this.isPress.Digit3)
        }
        else if(code == "Digit4")
        {
            this.KeyReleaseAction("Key_4",this.isPress.Digit4)
        }
        else if(code == "Digit5")
        {
            this.KeyReleaseAction("Key_5",this.isPress.Digit5)
        }
        else if(code == "Digit6")
        {
            this.KeyReleaseAction("Key_6",this.isPress.Digit6)
        }
        else if(code == "Digit7")
        {
            this.KeyReleaseAction("Key_7",this.isPress.Digit7)
        }
        else if(code == "Digit8")
        {
            this.KeyReleaseAction("Key_8",this.isPress.Digit8)
        }
        else if(code == "Digit9")
        {
            this.KeyReleaseAction("Key_9",this.isPress.Digit9)
        }
        else if(code == "Digit0")
        {
            this.KeyReleaseAction("Key_0",this.isPress.Digit0)
        }
        else if(code == "Minus")
        {
            this.KeyReleaseAction("Key_-",this.isPress.Minus)
        }
         else if(code == "Equal")
        {
            this.KeyReleaseAction("Key_=",this.isPress.Equal)
        }
        else if(code == "Backspace")
        {
            // this.KeyReleaseAction("Key_Backspace",this.isPress.Backspace)
        }
        else if(code == "Space")
        {
            this.KeyReleaseAction("Key_Spacebar",this.isPress.Space)
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
        //gui.add(HDRIParameter,'exposure', 0 , 4 , 0.01).onChange(this.UpdateRender)
        gui.add(PressDownAmount,'Amount',-0.001,-0.01,0.00000001).onChange(this.UpdateRender)
        //const PressKeyGUI = new GUI()
        //PressKeyGUI.add(PressDownAmount, 'PressDownAmount',0 , 1, 0.0001).onChange(this.UpdateRender)

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