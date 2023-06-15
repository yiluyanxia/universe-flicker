import {
    SphereGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
    TextureLoader,
    DoubleSide,
    Group,
    Vector2,
    LatheGeometry,
    Sprite,
    SpriteMaterial,
    CanvasTexture
} from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

let earth
function createMaterial(sphereVal, type) {
    const textureLoader = new TextureLoader()
    let texture
    if (type) {
        texture = textureLoader.load(sphereVal.additionalTextures)
    } else {
        texture = textureLoader.load(sphereVal.textures)
    }

    let material
    if (sphereVal.id === 'sun') {
        // material = new MeshBasicMaterial({ map: texture })
        material = new MeshPhongMaterial({ map: texture })
    } else if (type === 'venus') {
        material = new MeshStandardMaterial({
            map: texture,
            transparent: true,
            opacity: 0.8
        })
    } else if (type === 'earth') {
        material = new MeshStandardMaterial({
            map: texture,
            transparent: true,
            opacity: 0.5,
            side: DoubleSide
        })
    } else if (type === 'saturn') {
        material = new MeshStandardMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            side: DoubleSide
        })
    } else {
        material = new MeshStandardMaterial({ map: texture })
    }
    return material
}
function createSphere(sphereVal, curve, orbit, sprite) {
    const group = new Group()
    group.name = sphereVal.id

    const geometry = new SphereGeometry(sphereVal.radius, 100, 100)
    const material = createMaterial(sphereVal)
    const sphere = new Mesh(geometry, material)
    sphere.name = sphereVal.id

    group.add(sphere)

    // // 用 Sprite 创建标签
    // const canvas = document.createElement('canvas')
    // const ctx = canvas.getContext('2d')

    // canvas.width = 80
    // canvas.height = 30

    // ctx.fillStyle = '#fff'
    // ctx.font = 'normal 12pt 黑体'
    // ctx.fillText(sphereVal.name, 2, 25)

    // let url = canvas.toDataURL('image/png')

    // const spriteMaterial = new SpriteMaterial({
    //     map: new TextureLoader().load(url),
    //     sizeAttenuation: false,
    // })
    // const sprite = new Sprite(spriteMaterial)
    // sprite.layers.set(0)
    // sprite.scale.set(0.05, 0.03)
    // sprite.rotation.x = -(Math.PI / 180) * sphereVal.dip

    // sprite.translateY(-sphereVal.radius - 0.2)

    if (sphereVal.additionalTextures) {
        let additionalGeometry
        if (sphereVal.id === 'saturn') {
            const points = []
            for (let i = 0; i < 2; i += 0.2) {
                points.push(new Vector2(Math.sin(i) + 1, 0.001))
            }
            additionalGeometry = new LatheGeometry(points, 48)
        } else {
            additionalGeometry = new SphereGeometry(sphereVal.radius + 0.01, 100, 100)
        }

        const additionalmaterial = new createMaterial(sphereVal, sphereVal.id)
        const additionalSphere = new Mesh(additionalGeometry, additionalmaterial)
        group.add(additionalSphere)
    }

    if (sphereVal.dip) {
        group.rotation.x = (Math.PI / 180) * sphereVal.dip

        if (sphereVal.id === 'moon') {
            group.rotation.y = (Math.PI / 180) * 180
        }
    }

    if (sphereVal.orbitalInclination) {
        if (sphereVal.id === 'moon') {
            group.position.x =
                sphereVal.position[0] + sphereVal.orbit * Math.cos((Math.PI / 180) * sphereVal.orbitalInclination)
            group.position.y = sphereVal.orbit * Math.sin((Math.PI / 180) * sphereVal.orbitalInclination)
        } else {
            sprite.position.x = group.position.x =
                sphereVal.position[0] * Math.cos((Math.PI / 180) * sphereVal.orbitalInclination)
            group.position.y = sphereVal.position[0] * Math.sin((Math.PI / 180) * sphereVal.orbitalInclination)

            sprite.position.y = group.position.y - sphereVal.radius - 0.2
        }
    } else {
        group.position.set(...sphereVal.position)
        sprite.position.set(sphereVal.position[0], -(sphereVal.radius + 0.2), 0)
    }

    // 用  CSS2DObject 创建标签
    // const div = document.createElement('div')
    // div.className = 'label'
    // div.textContent = sphereVal.name
    // const label = new CSS2DObject(div)
    // label.position.set(1.5 * sphereVal.radius, 0, 0)
    // label.center.set(0, 1)
    // sphere.add(label)
    // label.layers.set(0)

    // group.add(sprite)

    let progress = 0
    group.tick = (delta) => {
        if (sphereVal.orbitalPeriod) {
            const point = curve.getPointAt(progress)
            const pointBox = curve.getPointAt(progress + sphereVal.orbitalPeriod)
            if (sphereVal.id === 'earth') {
                earth = point
            }
            if (sphereVal.id === 'moon') {
                orbit.position.set(earth.x, earth.y, earth.z)
                group.position.set(earth.x + point.x, earth.y + point.y, earth.z + point.z)
            } else {
                group.position.set(point.x, point.y, point.z)
                group.lookAt(pointBox.x, pointBox.y, pointBox.z)
            }
            sprite.position.set(group.position.x, group.position.y - (sphereVal.radius + 0.2), group.position.z)
            progress = progress >= 1 - sphereVal.orbitalPeriod * 2 ? 0 : (progress += sphereVal.orbitalPeriod)
        }
        if (sphereVal.rotationPeriod) {
            group.rotation.y += sphereVal.rotationPeriod
        }
    }
    return { sphere, group }
}

export { createSphere }
