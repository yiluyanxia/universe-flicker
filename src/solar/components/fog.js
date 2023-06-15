import { FogExp2 } from 'three'

let fog

function createFog(scene) {
    fog = fog ? fog : new FogExp2(0xbd0302, 0.00025)
    scene.fog = fog

    fog.tick = (delta) => {
        const time = Date.now() * 0.005

        scene.fog && (scene.fog.density = Math.sin(time) * 0.001 + 0.0005)
    }
    return fog
}
export { createFog }
