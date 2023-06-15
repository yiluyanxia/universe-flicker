import { SphereGeometry, Mesh, MeshStandardMaterial, TextureLoader, BackSide } from 'three'
import * as THREE from 'three'

function createMaterial() {
    const textureLoader = new TextureLoader()
    const texture = textureLoader.load('/assets/textures/8k_stars_milky_way.jpg')
    const material = new MeshStandardMaterial({ map: texture,  side: THREE.DoubleSide})
    return material
}
function createMilkyWay() {
    const geometry = new SphereGeometry(1000)

    const material = createMaterial()

    const milkyWay = new Mesh(geometry, material)

    return milkyWay
}
export { createMilkyWay }