import { Entity } from "../engine/entity";
import { TScene } from "../engine/scene";
import { TVoxelModel } from "../engine/voxel";
import { TFiller } from "./fillers/filler";
import { TSlot } from "./slot";

export const takeAppropriateFillers = (slot: TSlot, registry: TFiller[]) => registry.filter(filler => filler.checkCriteria(slot));
export const takeRandomAppropriateFiller = (slot: TSlot, registry: TFiller[]) => {
    const appropriateFillers = takeAppropriateFillers(slot, registry);
    return appropriateFillers[Math.floor(Math.random() * appropriateFillers.length)];
};

export abstract class AbstractWorldEntity extends Entity {
    slots: TSlot[] = [];
    ownChildren: Entity[] = [];
    parent: Entity | null = null;
    scene: TScene | null = null;
    unregister: (() => void) | null = null;

    generate(ownSlot: TSlot, scene: TScene, fillers: TFiller[]) {
        this.slots = this.defineSlots();
        this.model = this.defineModel(ownSlot);
        this.scene = scene;
        this.unregister = scene.register(this);

        this.slots.forEach((slot) => {
            const entity = takeRandomAppropriateFiller(slot, fillers).fill();
            this.ownChildren.push(entity);
            entity.parent = this;
            entity.generate(slot, scene, fillers);
            entity.object?.position.set(slot.position.x, slot.position.y, slot.position.z);
        });
    }

    abstract defineSlots(): TSlot[];
    abstract defineModel(slot: TSlot): TVoxelModel;
}