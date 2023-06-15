import { WebGLRenderer, LinearSRGBColorSpace, ReinhardToneMapping } from 'three'

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.physicallyCorrectLights = true
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMappingExposure = Math.pow(1, 4.0);
    renderer.outputColorSpace = LinearSRGBColorSpace
    renderer.toneMapping = ReinhardToneMapping
    renderer.useLegacyLights = true
    return renderer
}

export { createRenderer }