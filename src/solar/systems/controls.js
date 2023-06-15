import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas)

    controls.maxDistance = 800

    controls.tick = () => controls.update()

    return controls
}

export { createControls }
