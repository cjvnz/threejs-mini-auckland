import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Bim
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.renderer = this.experience.renderer

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Bim')
        }

        // Resource
        this.resource = this.resources.items.bim

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.03, 0.03, 0.03)
        this.model.position.x = -0.42
        this.model.position.y = 0.46
        this.model.position.z = -2.40
        this.model.rotation.y = Math.PI*0.7

        this.newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
        this.model.traverse((o) => {
            if (o.isMesh) o.material = this.newMaterial;
        });
        // this.scene.add(this.model)

        // console.log(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                // child.castShadow = true
                // child.receiveShadow = true
            }
        })

    

        // Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.model.position, 'x').min(-10).max(10).step(0.01)
            this.debugFolder.add(this.model.position, 'y').min(-10).max(10).step(0.01)
            this.debugFolder.add(this.model.position, 'z').min(-10).max(10).step(0.01)
            this.debugFolder.add(this.model.rotation, 'y').min(0).max(2*Math.PI).step(0.01).name('Rotation')

        }

    }
}