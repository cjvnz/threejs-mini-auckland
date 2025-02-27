import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        
            this.parameters = {}
        }

        this.setSunLight()
        this.setEnvironmentMap()


    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 20
        // this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.mapSize.set(2048, 2048)
        this.sunLight.shadow.normalBias = 0.01
        this.sunLight.position.set(10, 2.7, -5)
        this.scene.add(this.sunLight)


        // Debug
        if(this.debug.active)
        {
            this.parameters.lightHelper = () =>
            {
                if (this.helper)
                {
                    this.helper = null
                    this.scene.remove( this.scene.getObjectByProperty('type', 'DirectionalLightHelper'))
                }
                else
                {
                    this.helper = new THREE.DirectionalLightHelper( this.sunLight, 3 );
                    this.scene.add( this.helper );
                }
            }
            
            this.debugFolder
                .add(this.parameters, 'lightHelper')

            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 10)
                .max(15)
                .step(0.1)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 10)
                .max(15)
                .step(0.1)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 10)
                .max(15)
                .step(0.1)
        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
        
        this.scene.environment = this.environmentMap.texture
        // this.scene.background = this.environmentMap.texture
        this.scene.background = new THREE.Color( 0xF5F1ED );




        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.parameters.updateBackground = () =>
                {
                    if (this.scene.background)
                    {
                        this.scene.background = null
                    }
                    else
                    {
                        this.scene.background = this.environmentMap.texture
                    }
                }
            
            this.debugFolder
                .add(this.parameters, 'updateBackground')
                .name('setBackground')


            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
            
        }
    }
}