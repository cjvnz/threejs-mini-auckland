import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('OrbitControls') 
        }

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(18, 12, 18)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.maxPolarAngle = 1.52
        this.controls.minDistance = 1.0
        this.controls.maxDistance = 50.0
        this.controls.enableDamping = true

        if(this.debug.active)
        {
            this.debugFolder.add( this.controls, 'maxPolarAngle').min(0).max(Math.PI).step(0.01)
            this.debugFolder.add( this.controls, 'minDistance').min(0).max(20).step(0.1)
            this.debugFolder.add( this.controls, 'maxDistance').min(30).max(100).step(0.1)
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}