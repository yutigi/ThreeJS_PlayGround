import {  ACESFilmicToneMapping, AmbientLight, AudioListener, AudioLoader, Camera, DefaultLoadingManager, Group, Mesh, MeshPhysicalMaterial, PCFSoftShadowMap, PerspectiveCamera, PMREMGenerator, PointLight, PointLightHelper, PositionalAudio, Raycaster, Scene, SpotLight, SpotLightHelper, Texture, TextureLoader, UnsignedByteType, Vector2, Vector3, WebGLCubeRenderTarget, WebGLRenderer, WebGLRenderTarget } from "three"
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
import { listeners } from "process";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader"

const HDRIParameter = {
    exposure: 1.0
}

const PressDownAmount = {
    Amount: -0.005,
    Volume: 1
}

interface ObjectKey {
    positionY: number,
    object: Mesh
}

const mouse = new Vector2()

const keyCodes = {
  0: 'That key has no keycode',
  3: 'break',
  8: 'backspace / delete',
  9: 'tab',
  12: 'clear',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause/break',
  20: 'caps lock',
  21: 'hangul',
  25: 'hanja',
  27: 'escape',
  28: 'conversion',
  29: 'non-conversion',
  32: 'spacebar',
  33: 'page up',
  34: 'page down',
  35: 'end',
  36: 'home',
  37: 'left arrow',
  38: 'up arrow',
  39: 'right arrow',
  40: 'down arrow',
  41: 'select',
  42: 'print',
  43: 'execute',
  44: 'Print Screen',
  45: 'insert',
  46: 'delete',
  47: 'help',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  58: ':',
  59: 'semicolon (firefox), equals',
  60: '<',
  61: 'equals (firefox)',
  63: 'ß',
  64: '@ (firefox)',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'Windows Key / Left ⌘ / Chromebook Search key',
  92: 'right window key',
  93: 'Windows Menu / Right ⌘',
  95: 'sleep',
  96: 'numpad 0',
  97: 'numpad 1',
  98: 'numpad 2',
  99: 'numpad 3',
  100: 'numpad 4',
  101: 'numpad 5',
  102: 'numpad 6',
  103: 'numpad 7',
  104: 'numpad 8',
  105: 'numpad 9',
  106: 'multiply',
  107: 'add',
  108: 'numpad period (firefox)',
  109: 'subtract',
  110: 'decimal point',
  111: 'divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  124: 'f13',
  125: 'f14',
  126: 'f15',
  127: 'f16',
  128: 'f17',
  129: 'f18',
  130: 'f19',
  131: 'f20',
  132: 'f21',
  133: 'f22',
  134: 'f23',
  135: 'f24',
  136: 'f25',
  137: 'f26',
  138: 'f27',
  139: 'f28',
  140: 'f29',
  141: 'f30',
  142: 'f31',
  143: 'f32',
  144: 'num lock',
  145: 'scroll lock',
  151: 'airplane mode',
  160: '^',
  161: '!',
  162: '؛ (arabic semicolon)',
  163: '#',
  164: '$',
  165: 'ù',
  166: 'page backward',
  167: 'page forward',
  168: 'refresh',
  169: 'closing paren (AZERTY)',
  170: '*',
  171: '~ + * key',
  172: 'home key',
  173: 'minus (firefox), mute/unmute',
  174: 'decrease volume level',
  175: 'increase volume level',
  176: 'next',
  177: 'previous',
  178: 'stop',
  179: 'play/pause',
  180: 'e-mail',
  181: 'mute/unmute (firefox)',
  182: 'decrease volume level (firefox)',
  183: 'increase volume level (firefox)',
  186: 'semi-colon / ñ',
  187: 'equal sign',
  188: 'comma',
  189: 'dash',
  190: 'period',
  191: 'forward slash / ç',
  192: 'grave accent / ñ / æ / ö',
  193: '?, / or °',
  194: 'numpad period (chrome)',
  219: 'open bracket',
  220: 'back slash',
  221: 'close bracket / å',
  222: 'single quote / ø / ä',
  223: '`',
  224: 'left or right ⌘ key (firefox)',
  225: 'altgr',
  226: '< /git >, left back slash',
  230: 'GNOME Compose Key',
  231: 'ç',
  233: 'XF86Forward',
  234: 'XF86Back',
  235: 'non-conversion',
  240: 'alphanumeric',
  242: 'hiragana/katakana',
  243: 'half-width/full-width',
  244: 'kanji',
  251: 'unlock trackpad (Chrome/Edge)',
  255: 'toggle touchpad',
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

    fxaaPass: ShaderPass

    KeyChronQ2Model: Group

    exrCubeRenderTarget: WebGLRenderTarget
    exrBackground: Texture

    defaultPositions: Map<string, ObjectKey> = new Map<string, ObjectKey>()
 
    // layer 1
    Backquote: boolean
    Digit1: boolean
    Digit2: boolean
    Digit3: boolean
    Digit4: boolean
    Digit5: boolean
    Digit6: boolean
    Digit7: boolean
    Digit8: boolean
    Digit9: boolean
    Digit0: boolean
    Minus: boolean
    Equal: boolean
    Backspace: boolean

    // layer 2
    Tab: boolean
    Q: boolean
    W: boolean
    E: boolean
    R: boolean
    T: boolean
    Y: boolean
    U: boolean
    I: boolean
    O: boolean
    P: boolean
    BracketLeft: boolean
    BracketRight: boolean
    Backslash: boolean
    
    // layer 3
    Capslock: boolean
    F: boolean
    D: boolean
    A: boolean
    G: boolean
    H: boolean
    J: boolean
    K: boolean
    L: boolean
    S: boolean
    Semicolon: boolean
    Quote: boolean
    Enter: boolean

    // layer 4
    Shift_L: boolean
    Z: boolean
    X: boolean
    C: boolean
    V: boolean
    B: boolean
    N: boolean
    M: boolean
    Comma: boolean
    Period: boolean
    Slash: boolean
    Shift_R: boolean
    // layer 5
    Space: boolean

    raycaster: Raycaster = new Raycaster()

    currentSelect:string

    constructor(canvas: HTMLElement) {
        this.canvas = canvas
        this.windowsize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.init()
        this.UpdateRender()
        window.addEventListener('resize', this.windowResize)
        window.addEventListener('keydown', this.KeyPress)
        window.addEventListener('keyup', this.KeyUp)
        window.addEventListener('pointerdown', this.PointerDown)
        window.addEventListener('pointerup', this.PointerUp)
        window.addEventListener('pointermove', this.PointerMove)
    }

    PointerDown = (e) => {
        
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera(mouse,this.camera)
        const intersects = this.raycaster.intersectObjects(this.scene.children)
        //console.log(intersects)
        if(intersects.length > 0)
        {
            console.log(intersects[0].object)
            const selectedKey = intersects[0].object
            if(selectedKey.name != 'Keybord_Body_Frame')
            {
                this.KeyPressAction(selectedKey.name)
                this.currentSelect = selectedKey.name
            }
        }
    }

    PointerUp = (e) => {
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera(mouse,this.camera)
        const intersects = this.raycaster.intersectObjects(this.scene.children)
        if(intersects.length > 0)
        {
            const selectedKey = intersects[0].object
            if(selectedKey.name != 'Keybord_Body_Frame')
            {
                this.KeyReleaseAction(selectedKey.name)
            }
        }
    }

    PointerMove = (e) => {
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera(mouse,this.camera)
        const intersects = this.raycaster.intersectObjects(this.scene.children)
        if(intersects.length > 0)
        {
            const selectedKey = intersects[0].object
            if(selectedKey.name != 'Keybord_Body_Frame')
            {
                if(selectedKey.name != this.currentSelect)
                {
                    this.KeyReleaseAction(this.currentSelect)
                    this.currentSelect = ""
                }
            }
        }
    }

    KeyPressAction = (Key:string ,isPress:boolean = false):boolean =>{
        this.KeyChronQ2Model.traverse(geo =>{
            if(geo instanceof Mesh)
            {
                if(geo.name === Key && !isPress)
                {
                    geo.getObjectByName(Key).position.y = this.defaultPositions.get(Key).positionY + PressDownAmount.Amount 
                    
                    const AudioObj = this.defaultPositions.get(Key).object.children

                    if(AudioObj.length > 0)
                    {
                        //(AudioObj[0] as PositionalAudio).play()
                        const audio: PositionalAudio = AudioObj[0] as PositionalAudio
                        if(audio.isPlaying)
                        {
                            audio.stop()
                        }
                        audio.setVolume(PressDownAmount.Volume)
                        audio.play()
                    }
                    return true
                }          
            }
        })
        return false
    }
    KeyReleaseAction = (Key:string ,isPress:boolean = false):boolean =>{
        this.KeyChronQ2Model.traverse(geo =>{
            if(geo instanceof Mesh)
            {
                if(geo.name === Key && !isPress)
                {
                    geo.getObjectByName(Key).position.y = this.defaultPositions.get(Key).positionY
                }          
            }
        })
        return false
    }

    KeyPress = Key => {
        console.log(Key)
        const name = Key.key
        const code = Key.code
        const KeyCode = Key.KeyCode
        Key.preventDefault()
        if(code === 'KeyF')
        {
            //console.log("Press KeyF")
            //console.log(this.KeyChronQ2Model)
            this.KeyPressAction("Key_F",this.F)
        }
        else if(code === 'Escape')
        {
            this.KeyPressAction("Key_ESC",this.Backquote)
        }
        else if(code === 'Tab')
        {
            this.KeyPressAction("Key_Tap",this.Tab)
        }
        else if(code === 'CapsLock')
        {
            this.KeyPressAction("Key_Capslock",this.Capslock)
        }
        else if(code === 'ShiftLeft')
        {
            this.KeyPressAction("Key_Shift_L",this.Shift_L)
        }
        else if(code === 'ShiftRight')
        {
            this.KeyPressAction("Key_Shift_R",this.Shift_R)
        }
        else if(code === 'Backspace')
        {
            this.KeyPressAction("Key_Backspace",this.Backspace)
        }
        else if(code === 'ArrowUp')
        {
            this.KeyPressAction("Key_ArrowUp")
        }
        else if(code === 'ArrowDown')
        {
            this.KeyPressAction("Key_ArrowDown")
        }
        else if(code === 'ArrowLeft')
        {
            this.KeyPressAction("Key_ArrowLeft")
        }
        else if(code === 'ArrowRight')
        {
            this.KeyPressAction("Key_ArrowRight")
        }
        else if(code === 'ControlLeft')
        {
            this.KeyPressAction("Key_Control")
        }
        else if(code === 'MetaLeft')
        {
            this.KeyPressAction("Key_Option")
        }
        else if(code === 'AltLeft')
        {
            this.KeyPressAction("Key_Command_L")
        }
        else if(code === 'AltRight')
        {
            this.KeyPressAction("Key_Command_R")
        }
        else if(code === 'Delete')
        {
            this.KeyPressAction("Key_Del")
        }
        else if(code === 'Home')
        {
            this.KeyPressAction("Key_Home")
        }
        else if(code === 'KeyQ')
        {
            this.Q = this.KeyPressAction("Key_Q",this.Q)
        }
        else if(code == 'KeyW')
        {
            this.KeyPressAction("Key_W",this.W)
        }
        else if(code == 'KeyE')
        {
            this.KeyPressAction("Key_E",this.E)
        }
        else if(code == "KeyR")
        {
            this.KeyPressAction("Key_R",this.R)
        }
        else if(code == "KeyT")
        {
            this.KeyPressAction("Key_T",this.T)
        }
        else if(code == "KeyY")
        {
            this.KeyPressAction("Key_Y",this.Y)
        }
        else if(code == "KeyU")
        {
            this.KeyPressAction("Key_U",this.U)
        }
        else if(code == "KeyI")
        {
            this.KeyPressAction("Key_I",this.I)
        }
        else if(code == "KeyO")
        {
            this.KeyPressAction("Key_O",this.O)
        }
        else if(code == "KeyP")
        {
            this.KeyPressAction("Key_P",this.Y)
        }
        else if(code == "BracketLeft")
        {
            this.KeyPressAction("Key_BracketLeft",this.BracketLeft)
        }
        else if(code == "BracketRight")
        {
            this.KeyPressAction("Key_BracketRight",this.BracketRight)
        }
        else if(code == "Backslash")
        {
            this.KeyPressAction("Key_Backslash",this.Backslash)
        }
        else if(code == "KeyA")
        {
            this.KeyPressAction("Key_A",this.A)
        }
        else if(code == "KeyS")
        {
            this.KeyPressAction("Key_S",this.S)
        }
        else if(code == "KeyD")
        {
            this.KeyPressAction("Key_D",this.D)
        }
        else if(code == "KeyG")
        {
            this.KeyPressAction("Key_G",this.G)
        }
        else if(code == "KeyH")
        {
            this.KeyPressAction("Key_H",this.H)
        }
        else if(code == "KeyJ")
        {
            this.KeyPressAction("Key_J",this.J)
        }
        else if(code == "KeyK")
        {
            this.KeyPressAction("Key_K",this.K)
        }
        else if(code == "KeyL")
        {
            this.KeyPressAction("Key_L",this.L)
        }
        else if(code == "Semicolon")
        {
            this.KeyPressAction("Key_;",this.Semicolon)
        }
        else if(code == "Quote")
        {
            this.KeyPressAction("Key_'",this.Quote)
        }
        else if(code == "Enter")
        {
            this.KeyPressAction("Key_Enter",this.Enter)
        }
        else if(code == "KeyZ")
        {
            this.KeyPressAction("Key_Z",this.Z)
        }
        else if(code == "KeyX")
        {
            this.KeyPressAction("Key_X",this.X)
        }
        else if(code == "KeyC")
        {
            this.KeyPressAction("Key_C",this.C)
        }
        else if(code == "KeyV")
        {
            this.KeyPressAction("Key_V",this.V)
        }
        else if(code == "KeyB")
        {
            this.KeyPressAction("Key_B",this.B)
        }
        else if(code == "KeyN")
        {
            this.KeyPressAction("Key_N",this.N)
        }
        else if(code == "KeyM")
        {
            this.KeyPressAction("Key_M",this.M)
        }
        else if(code == "Comma")
        {
            this.KeyPressAction("Key_<",this.Comma)
        }
        else if(code == "Period")
        {
            this.KeyPressAction("Key_>",this.Period)
        }
        else if(code == "Slash")
        {
            this.KeyPressAction("Key_Slash",this.Slash)
        }
        else if(code == "Digit1")
        {
            this.KeyPressAction("Key_1",this.Digit1)
        }
        else if(code == "Digit2")
        {
            this.KeyPressAction("Key_2",this.Digit2)
        }
        else if(code == "Digit3")
        {
            this.KeyPressAction("Key_3",this.Digit3)
        }
        else if(code == "Digit4")
        {
            this.KeyPressAction("Key_4",this.Digit4)
        }
        else if(code == "Digit5")
        {
            this.KeyPressAction("Key_5",this.Digit5)
        }
        else if(code == "Digit6")
        {
            this.KeyPressAction("Key_6",this.Digit6)
        }
        else if(code == "Digit7")
        {
            this.KeyPressAction("Key_7",this.Digit7)
        }
        else if(code == "Digit8")
        {
            this.KeyPressAction("Key_8",this.Digit8)
        }
        else if(code == "Digit9")
        {
            this.KeyPressAction("Key_9",this.Digit9)
        }
        else if(code == "Digit0")
        {
            this.KeyPressAction("Key_0",this.Digit0)
        }
        else if(code == "Minus")
        {
            this.KeyPressAction("Key_-",this.Minus)
        }
         else if(code == "Equal")
        {
            this.KeyPressAction("Key_=",this.Equal)
        }
        else if(code == "Backspace")
        {
            // console.log("backspace")
            // this.KeyPressAction("Key_Backspace",this.Backspace)
        }
        else if(code == "Space")
        {
            this.KeyPressAction("Key_Spacebar",this.Space)
        }
    }
        
    KeyUp = Key => {
        const name = Key.key
        const code = Key.code
        const KeyCode = Key.KeyCode
        if(code === 'KeyF')
        {
           this.KeyReleaseAction("Key_F",this.F) 
        }
        else if(code === 'Escape')
        {
            this.KeyReleaseAction("Key_ESC",this.Backquote)
        }
        else if(code === 'Tab')
        {
            this.KeyReleaseAction("Key_Tap",this.Tab)
        }
        else if(code === 'CapsLock')
        {
            this.KeyReleaseAction("Key_Capslock",this.Capslock)
        }
        else if(code === 'ShiftLeft')
        {
            this.KeyReleaseAction("Key_Shift_L",this.Shift_L)
        }
        else if(code === 'ShiftRight')
        {
            this.KeyReleaseAction("Key_Shift_R",this.Shift_R)
        }
        else if(code === 'Backspace')
        {
            this.KeyReleaseAction("Key_Backspace",this.Backspace)
        }
        else if(code === 'ArrowUp')
        {
            this.KeyReleaseAction("Key_ArrowUp")
        }
        else if(code === 'ArrowDown')
        {
            this.KeyReleaseAction("Key_ArrowDown")
        }
        else if(code === 'ArrowLeft')
        {
            this.KeyReleaseAction("Key_ArrowLeft")
        }
        else if(code === 'ArrowRight')
        {
            this.KeyReleaseAction("Key_ArrowRight")
        }
        else if(code === 'ControlLeft')
        {
            this.KeyReleaseAction("Key_Control")
        }
        else if(code === 'MetaLeft')
        {
            this.KeyReleaseAction("Key_Option")
        }
        else if(code === 'AltLeft')
        {
            this.KeyReleaseAction("Key_Command_L")
        }
        else if(code === 'AltRight')
        {
            this.KeyReleaseAction("Key_Command_R")
        }
        else if(code === 'Delete')
        {
            this.KeyReleaseAction("Key_Del")
        }
        else if(code === 'Home')
        {
            this.KeyReleaseAction("Key_Home")
        }
        else if(code === 'KeyQ')
        {
            this.Q = this.KeyReleaseAction("Key_Q",this.Q)
            console.log(this.Q)
        }
        else if(code === 'KeyW')
        {
            this.KeyReleaseAction("Key_W",this.W)
        }
        else if(code === 'KeyE')
        {
            this.KeyReleaseAction("Key_E",this.E)
        }
        else if(code == "KeyR")
        {
            this.KeyReleaseAction("Key_R",this.R)
        }
        else if(code == "KeyT")
        {
            this.KeyReleaseAction("Key_T",this.T)
        }
        else if(code == "KeyY")
        {
            this.KeyReleaseAction("Key_Y",this.Y)
        }
        else if(code == "KeyU")
        {
            this.KeyReleaseAction("Key_U",this.U)
        }
        else if(code == "KeyI")
        {
            this.KeyReleaseAction("Key_I",this.I)
        }
        else if(code == "KeyO")
        {
            this.KeyReleaseAction("Key_O",this.O)
        }
        else if(code == "KeyP")
        {
            this.KeyReleaseAction("Key_P",this.Y)
        }
        else if(code == "BracketLeft")
        {
            this.KeyReleaseAction("Key_BracketLeft",this.BracketLeft)
        }
        else if(code == "BracketRight")
        {
            this.KeyReleaseAction("Key_BracketRight",this.BracketRight)
        }
        else if(code == "Backslash")
        {
            this.KeyReleaseAction("Key_Backslash",this.Backslash)
        }
        else if(code == "KeyA")
        {
            this.KeyReleaseAction("Key_A",this.A)
        }
        else if(code == "KeyS")
        {
            this.KeyReleaseAction("Key_S",this.S)
        }
        else if(code == "KeyD")
        {
            this.KeyReleaseAction("Key_D",this.D)
        }
        else if(code == "KeyG")
        {
            this.KeyReleaseAction("Key_G",this.G)
        }
        else if(code == "KeyH")
        {
            this.KeyReleaseAction("Key_H",this.H)
        }
        else if(code == "KeyJ")
        {
            this.KeyReleaseAction("Key_J",this.J)
        }
        else if(code == "KeyK")
        {
            this.KeyReleaseAction("Key_K",this.K)
        }
        else if(code == "KeyL")
        {
            this.KeyReleaseAction("Key_L",this.L)
        }
        else if(code == "Semicolon")
        {
            this.KeyReleaseAction("Key_;",this.Semicolon)
        }
        else if(code == "Quote")
        {
            this.KeyReleaseAction("Key_'",this.Quote)
        }
        else if(code == "Enter")
        {
            this.KeyReleaseAction("Key_Enter",this.Enter)
        }
        else if(code == "KeyZ")
        {
            this.KeyReleaseAction("Key_Z",this.Z)
        }
        else if(code == "KeyX")
        {
            this.KeyReleaseAction("Key_X",this.X)
        }
        else if(code == "KeyC")
        {
            this.KeyReleaseAction("Key_C",this.C)
        }
        else if(code == "KeyV")
        {
            this.KeyReleaseAction("Key_V",this.V)
        }
        else if(code == "KeyB")
        {
            this.KeyReleaseAction("Key_B",this.B)
        }
        else if(code == "KeyN")
        {
            this.KeyReleaseAction("Key_N",this.N)
        }
        else if(code == "KeyM")
        {
            this.KeyReleaseAction("Key_M",this.M)
        }
        else if(code == "Comma")
        {
            this.KeyReleaseAction("Key_<",this.Comma)
        }
        else if(code == "Period")
        {
            this.KeyReleaseAction("Key_>",this.Period)
        }
        else if(code == "Slash")
        {
            this.KeyReleaseAction("Key_Slash",this.Slash)
        }
        else if(code == "Digit1")
        {
            this.KeyReleaseAction("Key_1",this.Digit1)
        }
        else if(code == "Digit2")
        {
            this.KeyReleaseAction("Key_2",this.Digit2)
        }
        else if(code == "Digit3")
        {
            this.KeyReleaseAction("Key_3",this.Digit3)
        }
        else if(code == "Digit4")
        {
            this.KeyReleaseAction("Key_4",this.Digit4)
        }
        else if(code == "Digit5")
        {
            this.KeyReleaseAction("Key_5",this.Digit5)
        }
        else if(code == "Digit6")
        {
            this.KeyReleaseAction("Key_6",this.Digit6)
        }
        else if(code == "Digit7")
        {
            this.KeyReleaseAction("Key_7",this.Digit7)
        }
        else if(code == "Digit8")
        {
            this.KeyReleaseAction("Key_8",this.Digit8)
        }
        else if(code == "Digit9")
        {
            this.KeyReleaseAction("Key_9",this.Digit9)
        }
        else if(code == "Digit0")
        {
            this.KeyReleaseAction("Key_0",this.Digit0)
        }
        else if(code == "Minus")
        {
            this.KeyReleaseAction("Key_-",this.Minus)
        }
         else if(code == "Equal")
        {
            this.KeyReleaseAction("Key_=",this.Equal)
        }
        else if(code == "Backspace")
        {
            // this.KeyReleaseAction("Key_Backspace",this.Backspace)
        }
        else if(code == "Space")
        {
            this.KeyReleaseAction("Key_Spacebar",this.Space)
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
        
        this.fxaaPass = new ShaderPass(FXAAShader)
        this.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * this.windowsize.width/this.windowsize.height )
        this.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * this.windowsize.width/this.windowsize.height )


        this.composer.addPass(this.renderPass)
        this.composer.addPass(this.bloompass)
        this.composer.addPass(this.fxaaPass)
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
        //gui.add(PressDownAmount,'Amount',-0.001,-0.01,0.00000001).onChange(this.UpdateRender)
        gui.add(PressDownAmount,'Volume',0,3,0.01).onChange(this.UpdateRender)
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
        // this.scene.add(PointLight1Helper)

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
        // this.scene.add(spotlight1Helper)

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
                    
                    this.defaultPositions.set(geo.name,{positionY:geo.position.y, object:geo})

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


            // load sound
            const audioLoader = new AudioLoader()
            const listener = new AudioListener()
            this.camera.add(listener)
    
            audioLoader.load('keytap.mp3', buffer => {
                
                //console.log(buffer)
                this.defaultPositions.forEach( (value,key) =>{
                    const audio = new PositionalAudio( listener );
                    audio.setBuffer( buffer );
                    //this.scene.add(audio)
                    
                    this.defaultPositions.get(key).object.add(audio)

                    // this.KeyChronQ2Model.traverse(geo =>{
                    //     if(geo instanceof Mesh)
                    //     {
                    //         if(geo.name === key)
                    //         {
                    //             geo.add(audio)
                    //         }          
                    //     }
                    // })
                })
            })

        })

    }

    UpdateRender = () => {
        requestAnimationFrame(this.UpdateRender)

        this.controls.update()

        this.renderer.render(this.scene,this.camera)

        this.composer.render()
    }
}