import * as THREE from 'three';

export type TSlotTag = string;

export type TSlot = {
    position: THREE.Vector3;
    size: THREE.Vector3;
    tags: TSlotTag[];
    parent: TSlot;
};