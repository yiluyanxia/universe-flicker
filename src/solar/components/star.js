import {
    Vector3,
    Color,
    BufferGeometry,
    BufferAttribute,
    ShaderMaterial,
    Points,
    TextureLoader,
    AdditiveBlending,
} from 'three'

function createStar(sphereVal, type) {
    const amount = 5000
    const radius = 400

    const positions = new Float32Array(amount * 3)
    const colors = new Float32Array(amount * 3)
    const sizes = new Float32Array(amount)

    const vertex = new Vector3()
    const color = new Color(0xffffff)

    for (let i = 0; i < amount; i++) {
        vertex.x = (Math.random() * 2 - 1) * radius
        vertex.y = (Math.random() * 2 - 1) * radius
        vertex.z = (Math.random() * 2 - 1) * radius
        vertex.toArray(positions, i * 3)
        color.setHSL(0.0 + 0.1 * (i / amount), 0.98, 0.38)

        color.toArray(colors, i * 3)

        sizes[i] = 1
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('customColor', new BufferAttribute(colors, 3))
    geometry.setAttribute('size', new BufferAttribute(sizes, 1))

    const material = new ShaderMaterial({
        uniforms: {
            color: { value: new Color(0xffffff) },
            pointTexture: { value: new TextureLoader().load('assets/textures/spark1.png') },
        },
        vertexShader: document.getElementById('pointVertexshader').textContent,
        fragmentShader: document.getElementById('pointFragmentshader').textContent,

        blending: AdditiveBlending,
        depthTest: false,
        transparent: true,
    })

    const stars = new Points(geometry, material)

    const starsGeometry = stars.geometry
    const attributes = starsGeometry.attributes

    stars.tick = (delta) => {
        const time = Date.now() * 0.005

        for (let i = 0; i < attributes.size.array.length; i++) {
            attributes.size.array[i] = 1 + 10 * Math.sin(1 * i + time)
        }
        attributes.size.needsUpdate = true
    }

    return stars
}
export { createStar }
