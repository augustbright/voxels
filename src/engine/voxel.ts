import * as THREE from "three";

const LIST_SIZE = 1_000_000;
// const nearDistance = 200;
// const farDistance = 500;

const textureLoader = new THREE.TextureLoader();
const normalMap = textureLoader.load("/textures/noise/normal-map.png");

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
    roughness: 1.0, // Adjust roughness for material appearance
    metalness: 0.0, // Set metalness for non-metallic voxels
    flatShading: true,
    normalMap,
    normalScale: new THREE.Vector2(1, 1)
});

// cubeMaterial.onBeforeCompile = (shader) => {
//     shader.uniforms.maxRenderDistance = { value: nearDistance };

//     shader.vertexShader = shader.vertexShader.replace(
//         `#include <common>`,
//         `
//           #include <common>
//           attribute vec3 instancePosition;
//           uniform float maxRenderDistance;
//           varying float vDistance;
//         `
//     );

//     shader.vertexShader = shader.vertexShader.replace(
//         `#include <begin_vertex>`,
//         `
//           #include <begin_vertex>
//           vDistance = distance(cameraPosition, instancePosition);
//         `
//     );

//     shader.fragmentShader = shader.fragmentShader.replace(
//         `#include <common>`,
//         `
//           #include <common>
//           uniform float maxRenderDistance;
//           varying float vDistance;
//         `
//     );

//     shader.fragmentShader = shader.fragmentShader.replace(
//         `#include <dithering_fragment>`,
//         `
//           if (vDistance > maxRenderDistance) {
//             discard;
//           } else {
//             #include <dithering_fragment>
//           }
//         `
//     );
// };

const pointsMaterial = new THREE.PointsMaterial({
    size: 1.3,
    vertexColors: true,
});

const makeTestColor = (h: number, y: number) => {
    if (y === 0) {
        return new THREE.Color(0x301313);
    }
    if (y === h - 1) {
        return new THREE.Color(0x00ff00);
    }
    return new THREE.Color(0x503030);
};

export const createVoxelGrid = async (w: number, h: number, d: number) => {

    const positionsLists: Float32Array[] = [
        new Float32Array(LIST_SIZE * 3)
    ];
    const colorsLists: Float32Array[] = [
        new Float32Array(LIST_SIZE * 3)
    ];
    let totalCount = 0;
    let currentCount = 0;
    let currentPositions = positionsLists[0];
    let currentColors = colorsLists[0];

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            for (let z = 0; z < d; z++) {
                if (Math.random() > 0.7) {
                    currentPositions[currentCount * 3] = x;
                    currentPositions[currentCount * 3 + 1] = y;
                    currentPositions[currentCount * 3 + 2] = z;

                    const color = makeTestColor(h, y);

                    currentColors[currentCount * 3] = color.r;
                    currentColors[currentCount * 3 + 1] = color.g;
                    currentColors[currentCount * 3 + 2] = color.b;

                    totalCount++;
                    currentCount++;

                    if (currentCount === LIST_SIZE) {
                        positionsLists.push(new Float32Array(LIST_SIZE * 3));
                        colorsLists.push(new Float32Array(LIST_SIZE * 3));
                        currentCount = 0;
                        currentPositions = positionsLists[positionsLists.length - 1];
                        currentColors = colorsLists[colorsLists.length - 1];
                    }
                }
            }
        }
    }

    const instancedMesh = new THREE.InstancedMesh(cubeGeometry, cubeMaterial, totalCount);
    const instancePositions = new Float32Array(totalCount * 3);

    const pointsGeometry = new THREE.BufferGeometry();
    const pointsPositionsBuffer = new Float32Array(totalCount * 3);
    const pointsColorsBuffer = new Float32Array(totalCount * 3);

    for (let i = 0; i < positionsLists.length - 1; i++) {
        const positions = positionsLists[i];
        const colors = colorsLists[i];
        for (let j = 0; j < LIST_SIZE; j++) {
            const positionMatrix = new THREE.Matrix4();
            positionMatrix.setPosition(
                positions[j * 3],
                positions[j * 3 + 1],
                positions[j * 3 + 2]
            );
            instancedMesh.setMatrixAt(i * LIST_SIZE + j, positionMatrix);
            const color = new THREE.Color(colors[j * 3], colors[j * 3 + 1], colors[j * 3 + 2]);
            instancedMesh.setColorAt(i * LIST_SIZE + j, color);

            const idx = i * LIST_SIZE * 3 + j * 3;

            instancePositions[idx] = positions[j * 3];
            instancePositions[idx + 1] = positions[j * 3 + 1];
            instancePositions[idx + 2] = positions[j * 3 + 2];

            pointsPositionsBuffer[idx] = positions[j * 3];
            pointsPositionsBuffer[idx + 1] = positions[j * 3 + 1];
            pointsPositionsBuffer[idx + 2] = positions[j * 3 + 2];
            pointsColorsBuffer[idx] = colors[j * 3];
            pointsColorsBuffer[idx + 1] = colors[j * 3 + 1];
            pointsColorsBuffer[idx + 2] = colors[j * 3 + 2];
        }
    }

    for (let i = 0; i < currentCount; i++) {
        const positionMatrix = new THREE.Matrix4();
        positionMatrix.setPosition(
            currentPositions[i * 3],
            currentPositions[i * 3 + 1],
            currentPositions[i * 3 + 2]
        );
        instancedMesh.setMatrixAt((positionsLists.length - 1) * LIST_SIZE + i, positionMatrix);
        const color = new THREE.Color(currentColors[i * 3], currentColors[i * 3 + 1], currentColors[i * 3 + 2]);
        instancedMesh.setColorAt((positionsLists.length - 1) * LIST_SIZE + i, color);

        const currentIdx = (positionsLists.length - 1) * LIST_SIZE * 3 + i * 3;

        instancePositions[currentIdx] = currentPositions[i * 3];
        instancePositions[currentIdx + 1] = currentPositions[i * 3 + 1];
        instancePositions[currentIdx + 2] = currentPositions[i * 3 + 2];

        pointsPositionsBuffer[currentIdx] = currentPositions[i * 3];
        pointsPositionsBuffer[currentIdx + 1] = currentPositions[i * 3 + 1];
        pointsPositionsBuffer[currentIdx + 2] = currentPositions[i * 3 + 2];
        pointsColorsBuffer[currentIdx] = currentColors[i * 3];
        pointsColorsBuffer[currentIdx + 1] = currentColors[i * 3 + 1];
        pointsColorsBuffer[currentIdx + 2] = currentColors[i * 3 + 2];
    }

    cubeGeometry.setAttribute(
        "instancePosition",
        new THREE.InstancedBufferAttribute(instancePositions, 3)
    );

    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.instanceColor!.needsUpdate = true;

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositionsBuffer, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(pointsColorsBuffer, 3));
    const points = new THREE.Points(pointsGeometry, pointsMaterial);

    return {
        instancedMesh,
        points,
    };
};

export type TVoxel = {
    position: THREE.Vector3;
    color: THREE.Color;
};

export type TVoxelModel = TVoxel[];

export const generateVoxelObject = (voxels: TVoxelModel) => {
    const instancedMesh = new THREE.InstancedMesh(cubeGeometry, cubeMaterial, voxels.length);
    voxels.forEach((voxel, i) => {
        const positionMatrix = new THREE.Matrix4();
        positionMatrix.setPosition(voxel.position);
        instancedMesh.setMatrixAt(i, positionMatrix);
        instancedMesh.setColorAt(i, voxel.color);
    });

    return instancedMesh;
};