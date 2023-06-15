import { Sprite, SpriteMaterial, TextureLoader } from 'three'

function createSprite(sphereVal) {
    // 用 Sprite 创建标签
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 48
    canvas.height = 30

    ctx.fillStyle = '#fff'
    ctx.font = 'normal 12pt 黑体'
    ctx.textAlign = 'center'
    ctx.fillText(sphereVal.name, 24, 25)

    let url = canvas.toDataURL('image/png')

    const spriteMaterial = new SpriteMaterial({
        map: new TextureLoader().load(url),
        sizeAttenuation: false,
    })
    const sprite = new Sprite(spriteMaterial)
    sprite.scale.set(0.05, 0.03)

    return sprite
}
export { createSprite }
