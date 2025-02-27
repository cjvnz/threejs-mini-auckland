export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.png',
            'textures/environmentMap/nx.png',
            'textures/environmentMap/py.png',
            'textures/environmentMap/ny.png',
            'textures/environmentMap/pz.png',
            'textures/environmentMap/nz.png'
        ]
    },
    // {
    //     name: 'grassColorTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/color.jpg'
    // },
    // {
    //     name: 'grassNormalTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/normal.jpg'
    // },
    // {
    //     name: 'foxModel',
    //     type: 'gltfModel',
    //     path: 'models/Fox/glTF/Fox.gltf'
    // },
    {
        name: 'aucklandModel',
        type: 'gltfModel',
        path: '/models/Auckland/glTF-Binary/aucklandExport4.glb'

    },
    {
        name: 'aucklandFloorModel',
        type: 'gltfModel',
        path: '/models/Auckland/glTF-Binary/aucklandFloorExport1.glb'

    },
    {
        name: 'bim',
        type: 'gltfModel',
        path: '/models/Auckland/glTF/Export.gltf'

    }
]