import { PerspectiveCamera } from 'three'

function createCamera() {
    const camera = new PerspectiveCamera(45, 1, 0.1, 2000)

    camera.position.set(0, 0, 20)
    camera.lookAt(0, 0, 0);

    return camera
}
export { createCamera }