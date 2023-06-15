import { PointLight, AmbientLight } from 'three'
function createLights() {

    const ambientLight = new AmbientLight(0xffffff, 1)
    const pointLight = new PointLight(0xffffff, 5)

    const twinklingAmbientLight = new AmbientLight(0xff4002, 4)
    const twinklingPointLight = new PointLight(0xbd0302, 1)

    return {ambientLight, pointLight, twinklingAmbientLight, twinklingPointLight}
}

export { createLights }
