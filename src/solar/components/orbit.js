import { CatmullRomCurve3, BufferGeometry, LineBasicMaterial, LineLoop } from 'three'

function createOrbit(sphereVal) {
    let sphererObitalInclination = sphereVal.orbitalInclination || 0
    let sphereOrbit = sphereVal.orbit || 0
    let x = Math.cos((Math.PI / 180) * sphererObitalInclination) * sphereOrbit
    let y = Math.sin((Math.PI / 180) * sphererObitalInclination) * sphereOrbit
    const initialPoints = [
        {
            x: x,
            y: y,
            z: 0
        },
        { x: 0, y: 0, z: -sphereOrbit },
        {
            x: -x,
            y: -y,
            z: 0
        },
        { x: 0, y: 0, z: sphereOrbit }
    ]
    const curve = new CatmullRomCurve3(initialPoints)
    curve.curveType = 'catmullrom'
    curve.tension = 0.84
    curve.closed = true

    const points = curve.getPoints(50)

    const geometry = new BufferGeometry().setFromPoints(points)
    const material = new LineBasicMaterial({ color: 0x718799, transparent: true, opacity: 0.8 })

    const orbit = new LineLoop(geometry, material)

    if (sphereVal.id === 'moon') {
        orbit.position.x = 10
    }

    return { curve, orbit }
}

export { createOrbit }