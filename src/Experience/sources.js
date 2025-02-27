export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "./public/textures/environmentMap/px.png",
      "./public/textures/environmentMap/nx.png",
      "./public/textures/environmentMap/py.png",
      "./public/textures/environmentMap/ny.png",
      "./public/textures/environmentMap/pz.png",
      "./public/textures/environmentMap/nz.png",
    ],
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
    name: "aucklandModel",
    type: "gltfModel",
    path: "./public/models/Auckland/glTF-Binary/aucklandExport4.glb",
  },
  {
    name: "aucklandFloorModel",
    type: "gltfModel",
    path: "./public/models/Auckland/glTF-Binary/aucklandFloorExport1.glb",
  },
  {
    name: "bim",
    type: "gltfModel",
    path: "./public/models/Auckland/glTF/Export.gltf",
  },
];
