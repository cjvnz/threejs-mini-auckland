import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Auckland
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        // this.debug = this.experience.debug

        // // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('Auckland')
        // }

        // Resource
        this.resource = this.resources.items.aucklandModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.5, 0.5, 0.5)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }
}