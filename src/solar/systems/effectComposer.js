import { Vector2, ShaderMaterial } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'

function createEffectComposer(scene, camera, renderer) {
    const renderScene = new RenderPass(scene, camera)

    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)

    const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera)

    bloomPass.threshold = 0.2
    bloomPass.strength = 0.2
    bloomPass.radius = 0

    const bloomComposer = new EffectComposer(renderer)
    bloomComposer.renderToScreen = false
    bloomComposer.addPass(renderScene)
    bloomComposer.addPass(bloomPass)

    bloomComposer.addPass(outlinePass)
    outlinePass.edgeStrength = 10
    outlinePass.edgeGlow = 0.5
    outlinePass.edgeThickness = 8
    outlinePass.visibleEdgeColor.set(0xffc607)
    outlinePass.hiddenEdgeColor.set(0x000)

    const finalPass = new ShaderPass(
        new ShaderMaterial({
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture },
            },
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent,
            defines: {},
        }),
        'baseTexture'
    )
    finalPass.needsSwap = true

    const finalComposer = new EffectComposer(renderer)
    finalComposer.addPass(renderScene)
    finalComposer.addPass(finalPass)

    return { bloomPass, bloomComposer, finalComposer, outlinePass }
}

export { createEffectComposer }
