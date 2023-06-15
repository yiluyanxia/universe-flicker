export const SOLAR = [
    {
        id: 'sun',
        name: '太阳',
        radius: 1.6,
        position: [0, 0, 0],
        rotationPeriod: 0.016,
        dip: 7.25,
        textures: '/assets/textures/2k_sun.jpg'
    },
    {
        id: 'mercury',
        name: '水星',
        radius: 0.24, // 半径
        position: [3.87, 0, 0], // 坐标
        orbit: 3.87, // 轨道半径
        orbitalInclination: 7.005, // 轨道倾角
        orbitalPeriod: 0.0041, // 公转周期
        rotationPeriod: 0.0007, // 自转周期
        dip: 0, // 赤道倾角
        textures: '/assets/textures/2k_mercury.jpg' // 纹理贴图
    },
    {
        id: 'venus',
        name: '金星',
        radius: 0.61,
        position: [7.23, 0, 0],
        orbit: 7.23,
        orbitalInclination: 3.395,
        orbitalPeriod: 0.00162,
        rotationPeriod: 0.00017,
        dip: 177.4,
        textures: '/assets/textures/2k_venus_surface.jpg',
        additionalTextures: '/assets/textures/2k_venus_atmosphere.jpg'
    },
    {
        id: 'earth',
        name: '地球',
        radius: 0.64,
        position: [10, 0, 0],
        orbit: 10,
        orbitalInclination: 0,
        orbitalPeriod: 0.001,
        rotationPeriod: 0.0417,
        dip: 23.44,
        textures: '/assets/textures/2k_earth_daymap.jpg',
        additionalTextures: '/assets/textures/2k_earth_clouds.jpg'
    },
    {
        id: 'moon',
        name: '月球',
        radius: 0.16,
        position: [10, 0, 0],
        orbit: 1,
        orbitalInclination: 5.14,
        orbitalPeriod: 0.0015,
        rotationPeriod: 0.00139,
        dip: 6.68,
        textures: '/assets/textures/2k_moon.jpg'
    },
    {
        id: 'mars',
        name: '火星',
        radius: 0.34,
        position: [15.23, 0, 0],
        orbit: 15.23,
        orbitalInclination: 1.85,
        orbitalPeriod: 0.00053,
        rotationPeriod: 0.0417,
        dip: 25.19,
        textures: '/assets/textures/2k_mars.jpg'
    },
    {
        id: 'jupiter',
        name: '木星',
        radius: 1,
        position: [52.02, 0, 0],
        orbit: 52.02,
        orbitalInclination: 1.303,
        orbitalPeriod: 0.00084,
        rotationPeriod: 0.1,
        dip: 3.08,
        textures: '/assets/textures/2k_jupiter.jpg'
    },
    {
        id: 'saturn',
        name: '土星',
        radius: 0.9,
        position: [95.55, 0, 0],
        orbit: 95.55,
        orbitalInclination: 2.489,
        orbitalPeriod: 0.00034,
        rotationPeriod: 0.1,
        dip: 26.7,
        textures: '/assets/textures/2k_saturn.jpg',
        additionalTextures: '/assets/textures/2k_saturn_ring_alpha.png'
    },
    {
        id: 'uranus',
        name: '天王星',
        radius: 0.52,
        diameter: 16.3,
        position: [192.18, 0, 0],
        orbit: 192.18,
        orbitalInclination: 0.773,
        orbitalPeriod: 0.00012,
        rotationPeriod: 0.058,
        dip: 97.9,
        textures: '/assets/textures/2k_uranus.jpg'
    },
    {
        id: 'neptune',
        name: '海王星',
        radius: 0.5,
        position: [301.1, 0, 0],
        orbit: 301.1,
        orbitalInclination: 1.77,
        orbitalPeriod: 0.00006,
        rotationPeriod: 0.063,
        dip: 27.8,
        textures: '/assets/textures/2k_neptune.jpg'
    }
]
