import { Entity } from "../engine/entity";
import { TScene } from "../engine/scene";
import { TVoxelModel } from "../engine/voxel";
import { takeRandom } from "../utils";
import { TFiller } from "./fillers/filler";
import { TSlot } from "./slot";

export const takeAppropriateFillers = (slot: TSlot, registry: TFiller[]) => registry.filter(filler => filler.checkCriteria(slot));
export const takeRandomAppropriateFiller = (slot: TSlot, registry: TFiller[]) => {
    const appropriateFillers = takeAppropriateFillers(slot, registry);
    const filler = appropriateFillers[Math.floor(Math.random() * appropriateFillers.length)];
    if (!filler) {
        return null;
    }
    return takeRandom(filler.fills);
};

export abstract class AbstractWorldEntity<
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Extra = {}
> extends Entity {
    slots: TSlot[] = [];
    ownChildren: AbstractWorldEntity[] = [];
    parent: Entity | null = null;
    scene: TScene | null = null;
    unregister: (() => void) | null = null;
    generated = false;

    constructor(public readonly props: {
        passTags?: (ownSlot: TSlot) => TSlot['tags'];
    } & Extra) {
        super();
    }

    generate(ownSlot: TSlot, scene: TScene, fillers: TFiller[]) {
        if (this.generated) {
            this.degenerate();
        }

        this.slots = this.defineSlots(ownSlot);
        this.slots.forEach((slot) => {
            slot.tags = this.props.passTags ? this.props.passTags(slot) : slot.tags;
        });
        this.model = this.defineModel(ownSlot);
        this.scene = scene;
        this.unregister = scene.register(this);

        this.slots.forEach((slot) => {
            const fill = takeRandomAppropriateFiller(slot, fillers);
            if (fill) {
                const entity = fill(slot);
                this.ownChildren.push(entity);
                entity.parent = this;
                entity.generate(slot, scene, fillers);
                entity.object?.position.set(slot.position.x, slot.position.y, slot.position.z);
            } else {
                console.log('No filler found for slot', slot);
            }
        });

        this.generated = true;
    }

    degenerate() {
        this.ownChildren.forEach((child) => {
            child.degenerate();
        });
        this.unregister?.();
        this.unregister = null;
        this.scene = null;
        this.generated = false;
    }

    abstract defineSlots(ownSlot: TSlot): TSlot[];
    abstract defineModel(slot: TSlot): TVoxelModel;
}