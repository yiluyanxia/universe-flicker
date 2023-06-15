import { createCamera } from './components/camera.js'
import { createSphere } from './components/sphere.js'
import { createOrbit } from './components/orbit.js'
import { createStar } from './components/star.js'
import { createSprite } from './components/sprite.js'
import { createMilkyWay } from './components/milkyWay.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createFog } from './components/fog.js'
import { createControls } from './systems/controls.js'
import { createRenderer } from './systems/renderer.js'
import { createEffectComposer } from './systems/effectComposer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'
import { SOLAR } from '../constants/solar.js'

import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import { Color } from 'three'

let camera
let scene
let renderer
let loop
let labelRenderer
let dblclickFlag
let orbitColor

class Solar {
    constructor(container) {
        renderer = createRenderer()
        container.append(renderer.domElement)

        // labelRenderer = new CSS2DRenderer()
        // labelRenderer.setSize(window.innerWidth, window.innerHeight)
        // labelRenderer.domElement.style.position = 'absolute'
        // labelRenderer.domElement.style.top = '0px'
        // container.append(labelRenderer.domElement)

        scene = createScene()
        camera = createCamera()

        const controls = createControls(camera, renderer.domElement)
        // const controls = createControls(camera, labelRenderer.domElement)
        const { ambientLight, pointLight, twinklingAmbientLight, twinklingPointLight } = createLights()

        scene.add(ambientLight, pointLight, twinklingAmbientLight, twinklingPointLight)
        twinklingAmbientLight.visible = false
        twinklingPointLight.visible = false

        const sarts = createStar()
        scene.add(sarts)
        sarts.visible = false

        const { bloomPass, bloomComposer, finalComposer, outlinePass } = createEffectComposer(scene, camera, renderer)

        loop = new Loop(camera, scene, renderer, bloomComposer, finalComposer, labelRenderer)
        loop.updatables.push(controls, sarts)

        const milkyWay = createMilkyWay()
        scene.add(milkyWay)

        SOLAR.map((i) => {
            const { curve, orbit } = createOrbit(i)
            scene.add(orbit)

            const sprite = createSprite(i)
            scene.add(sprite)

            const { sphere, group } = createSphere(i, curve, orbit, sprite)
            scene.add(group)

            loop.updatables.push(group)
            if (i.id === 'sun') {
                sprite.visible = false
                sphere.layers.enable(1)
                outlinePass.selectedObjects = [sphere]
            }
        })

        controls.addEventListener('change', () => {
            const distance = Math.ceil(controls.getDistance())
            if (distance > 21) {
                bloomPass.strength = (distance * 2) / 100 + 0.2
            } else {
                bloomPass.strength = 0.2
            }
        })

        window.addEventListener('dblclick', () => {
            dblclickFlag = dblclickFlag ? false : true

            if (dblclickFlag) {
                orbitColor = 0x8c0600

                const fog = createFog(scene)
                loop.updatables.push(fog)

                ambientLight.visible = false
                pointLight.visible = false
                twinklingAmbientLight.visible = true
                twinklingPointLight.visible = true

                sarts.visible = true

                outlinePass.visibleEdgeColor.set(0x8c0600)
            } else {
                orbitColor = 0x718799

                scene.fog = null

                ambientLight.visible = true
                pointLight.visible = true
                twinklingAmbientLight.visible = false
                twinklingPointLight.visible = false

                sarts.visible = false

                outlinePass.visibleEdgeColor.set(0xffc607)
            }

            this.handleOrbit()
        })

        const resizer = new Resizer(container, camera, renderer)
    }

    render() {
        renderer.render(scene, camera)
    }
    start() {
        loop.start()
    }
    stop() {
        loop.stop()
    }
    handleOrbit() {
        scene.traverseVisible((obj) => {
            if (obj.isLineLoop) {
                obj.material.color = new Color(orbitColor)
            }
        })
    }
}
export { Solar }
