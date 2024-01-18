// import _ from 'lodash'
import { ERR_TARGET_UNDEFINED } from "./constants"

export function harveste(creep: Creep, source: any, target?: any) {
    if (!target) {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (i: any) => i.structureType == STRUCTURE_SPAWN
                || i.structureType == STRUCTURE_EXTENSION
        })
        if (targets.length > 1)
            target = targets.sort((a: any, b: any) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY])[0]
        else
            target = targets[0]
    }

    if (creep.store.getFreeCapacity() > 0) {
        if (source.store) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: "#EEEFFF"
                    }
                })
                creep.say("🛻前往提取能量...")
            }
        } else {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: "#EEEFFF"
                    }
                })
                creep.say("🛵前往挖矿...")
            } else
                creep.say("⛏️挖矿中...")
        }
    } else {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: "#BBBFFF"
                }
            })
            creep.say("🚚前往入库...")
        }
    }
}

export function upgrade(creep: any, source: any) {
    const target = creep.room.controller;
    if (creep.store[RESOURCE_ENERGY] == 0) creep.memory.upgrading = false
    if (creep.store.getFreeCapacity() == 0) creep.memory.upgrading = true
    if (creep.memory.upgrading) {
        if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: "#AAABBB"
                }
            })
            creep.say("➡️前往升级")
        } else
            creep.say("⬆️升级中...")
    } else {
        if (source.store) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say("🔌前往充能")
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: "#BBBFFF"
                    }
                })
            }
        } else {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.say("➡️前往挖矿")
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: "#BBBFFF"
                    }
                })
            } else
                creep.say("⛏️挖矿中...")
        }
    }
}

export function build(creep: any, source: any, target?: ConstructionSite) {
    if (!target) {
        target = creep.room.find(FIND_CONSTRUCTION_SITES).sort((a: ConstructionSite, b: ConstructionSite) => b.progress - a.progress)[0]
    }
    if (!target) return ERR_TARGET_UNDEFINED
    if (creep.store[RESOURCE_ENERGY] == 0) creep.memory.building = false
    if (creep.store.getFreeCapacity() == 0) creep.memory.building = true

    if (creep.memory.building) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: "#998866"
                }
            })
            creep.say('➡️前往施工现场...')
        } else
            creep.say('🪚正在施工...')
    } else {
        if (source.store) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say("➡️取材料")
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: "#ffffee"
                    }
                })
            }
        } else {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo("➡️前往矿场")
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: "#998866"
                    }
                })
            } else creep.say("⛏️挖材料...")
        }
    }
}

export function repair(creep: Creep, target: Structure) {
    if (creep.store[RESOURCE_ENERGY] == 0) {
        creep.say("🔌没电了")
        const source = creep.room.find(FIND_STRUCTURES, { filter: (s: Structure) => s.structureType == STRUCTURE_CONTAINER })
            .sort((a: any, b: any) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY])[0]

        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {
                visualizePathStyle: {
                    stroke: "#FFFFFF"
                }
            })
            creep.say("➡️前往充电...")
        }
    } else {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: "#FFFFFF"
                }
            })
            creep.say("➡️前往目标")
        } else
            creep.say("🛠️维修中...")
    }
}

export function remove(creep: any, source: StructureContainer, target: StructureContainer) {
    if (creep.store.getFreeCapacity() == 0) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: "#FFFFFF"
                }
            })
            creep.say("🚚送货中...")
        }
    } else {
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {
                visualizePathStyle: {
                    stroke: "#FFFFFF"
                }
            })
            creep.say("🛻取货中...")
        }
    }
}