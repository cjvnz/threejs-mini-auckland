import * as THREE from 'three'
import Experience from '../Experience.js'
import waterVertexShader from '../Shaders/water/vertex.glsl'
import waterFragmentShader from '../Shaders/water/fragment.glsl'

export default class Water
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.clock = new THREE.Clock()

        this.colorObject = {}
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('AucklandWater') 
        }

        this.setWater()
    }

    setWater()
    {
        // Geometry
        this.waterGeometry = new THREE.PlaneGeometry(2, 2, 521, 512)

        // Colors
        this.colorObject.depthColor = '#186691'
        this.colorObject.surfaceColor = '#9bd8ff'

        // Material
        this.waterMaterial = new THREE.ShaderMaterial({
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            uniforms:
            {

                uTime: { value: 0 },

                uLowFreqWavesElevation: { value: 0.04 },

                uBigWavesSpeed: { value: 0.75 }, 
                uBigWavesElevation: { value: 0.03 },
                uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },

                uSmallWavesElevation: { value: 0.07 },
                uSmallWavesFrequency: { value: 3 },
                uSmallWavesSpeed: { value: 0.2 },
                uSmallIterations: { value: 4 },

                uDepthColor: { value: new THREE.Color(this.colorObject.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.colorObject.surfaceColor) },
                uColorOffset: { value: 0.1 },
                uColorMultiplier: { value: 1.1 }
            }
        })

        // Mesh
        this.water = new THREE.Mesh(this.waterGeometry, this.waterMaterial)
        this.water.rotation.x = - Math.PI * 0.5
        this.water.position.y = -0.2
        this.water.scale.x = 10
        this.water.scale.y = 10

        this.scene.add(this.water)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder.addColor(this.colorObject, 'depthColor').onChange(() => { this.waterMaterial.uniforms.uDepthColor.value.set(this.colorObject.depthColor) })
            this.debugFolder.addColor(this.colorObject, 'surfaceColor').onChange(() => { this.waterMaterial.uniforms.uSurfaceColor.value.set(this.colorObject.surfaceColor) })
            
            this.debugFolder.add(this.waterMaterial.uniforms.uLowFreqWavesElevation, 'value').min(0).max(0.5).step(0.001).name('uLowFreqWavesElevation')

            this.debugFolder.add(this.waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(0.5).step(0.001).name('uBigWavesElevation')
            this.debugFolder.add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
            this.debugFolder.add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
            this.debugFolder.add(this.waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

            this.debugFolder.add(this.waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
            this.debugFolder.add(this.waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
            this.debugFolder.add(this.waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
            this.debugFolder.add(this.waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

            this.debugFolder.add(this.waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
            this.debugFolder.add(this.waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
        }


    }

    update()
    {
        this.elapsedTime = this.clock.getElapsedTime()

        this.waterMaterial.uniforms.uTime.value = this.elapsedTime

    }
}