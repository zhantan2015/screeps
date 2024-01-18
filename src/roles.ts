import { build, harveste, upgrade, remove, repair } from './actions'
import { Incubator } from './incubator'
import { ERR_TARGET_UNDEFINED } from "./constants"

export class Role {
    protected creep: any
    constructor(creep: Creep) {
        this.creep = creep
    }
    public reborn() {
        if (this.creep.ticksToLive <= 10) {
            new Incubator(Game.getObjectById(this.creep.memory.spawnId) as StructureSpawn)
            this.creep.memory.reborn = true
        }
    }
}

export class Harvester extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const sources = this.creep.room.find(FIND_STRUCTURES, { filter: (i: any) => i.structureType == STRUCTURE_CONTAINER })
            .sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])
        let source = sources.length > 1 ? sources.sort((a: Source, b: Source) => b.energy - a.energy)[0] : sources[0]
        if (source.store[RESOURCE_ENERGY] <= 100) source = this.creep.room.find(FIND_SOURCES)[0]
        harveste(this.creep, source)
        return this
    }
}

export class SuperHarvesterLeft extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        harveste(this.creep, Game.getObjectById(this.creep.memory.source), Game.getObjectById(this.creep.memory.target))
        return this
    }
}

export class SuperHarvesterRight extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        harveste(this.creep, Game.getObjectById(this.creep.memory.source), Game.getObjectById(this.creep.memory.target))
        return this
    }
}

export class Upgrader extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const source = ["97c87bf18bae384", "b1d973930498269", "415577aed772e75"]
            .map(i => Game.getObjectById(i)).sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])[0] as StructureContainer;
        upgrade(this.creep, source)
        return this
    }
}

export class Builder extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const sources = this.creep.room.find(FIND_STRUCTURES, { filter: (i: any) => i.structureType == STRUCTURE_CONTAINER })
            .sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])
        let source = sources.sort((a: Source, b: Source) => b.energy - a.energy)[0]
        if (build(this.creep, source) == ERR_TARGET_UNDEFINED) {
            const target = this.creep.room.find(FIND_STRUCTURES, { filter: (i: any) => i.ticksToDecay }).sort((a: any, b: any) => a.ticksToDecay - b.ticksToDecay)[0]
            repair(this.creep, target)
        }

        return this;
    }
}

export class Repairer extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const target = this.creep.room.find(FIND_STRUCTURES, { filter: (i: any) => i.ticksToDecay }).sort((a: any, b: any) => a.ticksToDecay - b.ticksToDecay)[0]
        repair(this.creep, target)
        return this
    }
}

export class Remover extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const source: StructureContainer = ["80bf6df0e39c583"]
            .map(i => Game.getObjectById(i)).sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])[0] as StructureContainer;
        const target = ["97c87bf18bae384", "b1d973930498269", "415577aed772e75"]
            .map(i => Game.getObjectById(i)).sort((a: any, b: any) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY])[0] as StructureContainer;
        remove(this.creep, source, target)
        return this
    }
}