import * as THREE from "three";

export const createVoxel = (color: number, position: THREE.Vector3) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color });
    const voxel = new THREE.Mesh(geometry, material);

    voxel.position.copy(position);
    return voxel;
};

type TVoxel = ReturnType<typeof createVoxel>;

export const createVoxelGrid = (size: number): TVoxel[] => {
    const voxels: TVoxel[] = [];
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                if (Math.random() > 0.7) { // Randomly place some voxels
                    const voxel = createVoxel(0x00ff00, new THREE.Vector3(x, y, z));
                    voxels.push(voxel);
                }
            }
        }
    }

    return voxels;
};
