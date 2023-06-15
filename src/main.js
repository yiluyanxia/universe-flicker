import { Solar } from './solar/Solar.js'

async function main() {

    const container = document.querySelector('#scene-container')

    const solar = new Solar(container)
    
    solar.start()
}

main()
