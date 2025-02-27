import Experience from '../Experience.js'
import Environment from './Environment.js'
// import Floor from './Floor.js'
import Auckland from './Auckland.js'
import AucklandFloor from './AucklandFloor.js'
// import Fox from './Fox.js'
import Water from './Water.js'
import Bim from './Bim.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.floor = new Floor()
            // this.fox = new Fox()
            this.water = new Water()
            this.aucklandFloor = new AucklandFloor()
            this.auckland = new Auckland()
            this.bim = new Bim()
            this.environment = new Environment()
            
            
        })
    }

    update()
    {
        // if(this.fox)
        //     this.fox.update()
        if(this.water)
            this.water.update()
    }
}