import _ from 'lodash'
export function build(creep: any) {
    if (creep.store.getFreeCapacity() == 0) {
        creep.memory.building = true
    }
    if (creep.memory.building) {
        const cons = creep.room.find(FIND_CONSTRUCTION_SITES)
        if (cons.length == 0) return true;
        const target = cons.sort((a: any, b: any) => b.progress - a.progress)[0]
        creep.say('前往施工现场...')
        if (creep.build(target) == ERR_NOT_IN_RANGE)
            creep.moveTo(target, {
                visualizePathStyle: { stroke: '#ffbbcc' }
            })
        else {
            creep.say("施工中...")
        }
        if (creep.build(target) == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.building = false
        }
    }
    if (!creep.memory.building) {
        const sources: any = creep.room.find(FIND_STRUCTURES, { filter: (i: any) => i.structureType == STRUCTURE_CONTAINER });
        const source = sources.sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])[0]
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {
                visualizePathStyle: { stroke: '#ffaa00' }
            })
        } else creep.withdraw(source, RESOURCE_ENERGY);

        creep.say('拿材料...')
    }
}

export function repair(creep: Creep) {
    if (creep.store[RESOURCE_ENERGY] == 0) {
        const source = creep.room.find(FIND_STRUCTURES,
            { filter: (i: any) => i.structureType == STRUCTURE_CONTAINER })
            .sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])[0]
        creep.say("⬆️前往充能")
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            creep.moveTo(source)
    } else {
        const target = creep.room.find(FIND_STRUCTURES,
            { filter: (i: any) => i.ticksToDecay })
            .sort((a: any, b: any) => a.ticksToDecay - b.ticksToDecay)[0]
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.say("🛵前往维修...")
            creep.moveTo(target)
        } else creep.say('🛠️维修中...')
    }
}

export function harveste(creep: Creep) {
    if (creep.store.getFreeCapacity() > 0) {
        creep.say('去采矿...')
        const sources: any = [Game.getObjectById("964c2e1bee7c73a"), Game.getObjectById("67172f624ccebf3")].filter(i => i);
        const source = sources.length > 0 ? sources.sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])[0] : { store: null };
        if (source.store && source.store[RESOURCE_ENERGY] > 0 && creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            creep.moveTo(source, {
                visualizePathStyle: { stroke: '#ffaa00' }
            })
        else {
            const target = creep.room.find(FIND_SOURCES)[0];
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: '#ffaa00' }
                })
            }
        }
    } else {
        let target = creep.room.find(FIND_STRUCTURES, {
            filter: structure => (structure.structureType == STRUCTURE_EXTENSION
                || structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        })
        if (target.length > 0) {
            target = target.sort((a: any, b: any) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY])
            creep.say('去入库...')
            if (creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(target[0], {
                    visualizePathStyle: { stroke: '#ffffff' }
                })
        } else {
            return true
        }
    }
}

export function superHarveste(creep: any) {
    if (creep.store.getFreeCapacity() > 0) {
        const sources: any = Game.getObjectById(creep.memory.source);
        creep.say('⛏️去采矿...')
        if (creep.harvest(sources) == ERR_NOT_IN_RANGE)
            creep.moveTo(sources, {
                visualizePathStyle: { stroke: '#ffaa00' }
            })
    } else {
        const target: any = Game.getObjectById(creep.memory.container)
        if (target.store.getFreeCapacity() > 0) {
            creep.say('📦去装箱...')
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: '#ffffff' }
                })
        } else {
            return true
        }
    }
}

export function upgrade(creep: any) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.upgrading = false;

    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
        creep.memory.upgrading = true;
    }

    if (creep.memory.upgrading) {
        creep.say('⚡升级中...');
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } })
    }
    else {
        const sources: any = ['b82635dcd398f49', '107b351ae797e7d', '7aca3005afbc0be'].map((i: any) => {
            const obj: any = Game.getObjectById(i)
            return obj ? { store: obj.store[RESOURCE_ENERGY], obj } : null
        }).filter(i => i)
        const source = sources.length > 0 ? sources.sort((a, b) => b.store - a.store)[0].obj : null
        creep.say('🔄采集能量...')
        if (source)
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(source, {
                    visualizePathStyle: { stroke: '#ffaa00' }
                })
            else
                creep.withdraw(source, RESOURCE_ENERGY)
        else {
            const target = creep.room.find(FIND_SOURCES)[0]
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
        }
    }
}

export function _remove(creep: any): boolean {
    const sources: any = ['67172f624ccebf3', '964c2e1bee7c73a'].map(i => Game.getObjectById(i))
    const source = sources[0].store[RESOURCE_ENERGY] >= sources[1].store[RESOURCE_ENERGY] ? sources[0] : sources[1];
    const targets: any = ['b82635dcd398f49', '107b351ae797e7d', '7aca3005afbc0be'].map((i: any) => {
        const obj: any = Game.getObjectById(i)
        return { store: obj.store[RESOURCE_ENERGY], obj }
    }).sort((a, b) => a.store - b.store)
    const target = targets[0].obj
    if (target.store.getFreeCapacity() == 0 || source.store[RESOURCE_ENERGY] == 0)
        return true

    if (creep.store[RESOURCE_ENERGY] == 0) {
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say('取货中...');
            creep.moveTo(source, {
                visualizePathStyle: { stroke: '#ffaa00' }
            })
        }
    } else {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say('送货中...');
            creep.moveTo(target, {
                visualizePathStyle: { stroke: '#ffaa00' }
            })
        }
    }
}