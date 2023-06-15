import { Clock, Layers, MeshBasicMaterial } from 'three'

const clock = new Clock()

const bloomLayer = new Layers()
bloomLayer.set(1)
const materials = {}
const darkMaterial = new MeshBasicMaterial({ color: 'black' })

class Loop {
    constructor(camera, scene, renderer, bloomComposer, finalComposer, labelRenderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.labelRenderer = labelRenderer

        this.bloomComposer = bloomComposer
        this.finalComposer = finalComposer
        this.updatables = []
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick()
            this.renderer.render(this.scene, this.camera)
            // this.labelRenderer.render(this.scene, this.camera)

            this.scene.traverse(this.darkenNonBloomed)
            this.bloomComposer.render()
            this.scene.traverse(this.restoreMaterial)
            this.finalComposer.render()
        })
    }
    stop() {
        this.renderer.setAnimationLoop(null)
    }
    tick() {
        const delta = clock.getDelta()
        for (const object of this.updatables) {
            object.tick && object.tick(delta)
        }
    }
    darkenNonBloomed(obj) {
        if ((obj.isMesh && bloomLayer.test(obj.layers) === false) || obj.isSprite) {
            materials[obj.uuid] = obj.material
            obj.material = darkMaterial
        }
    }

    restoreMaterial(obj) {
        if (materials[obj.uuid]) {
            obj.material = materials[obj.uuid]
            delete materials[obj.uuid]
        }
    }
}

export { Loop }
