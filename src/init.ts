import _ from 'lodash'
import { Harvester, Remover, Repairer, SuperHarvesterLeft, SuperHarvesterRight } from './roles'
import { Upgrader } from './roles'
import { Builder } from './roles'
import creepConfig from './creepConfig'

export default () => {

    const spawn: any = Game.spawns['Spawn1']
    if (!spawn.memory.taskList) spawn.memory.taskList = [];
    const harvesters = _.
        filter(Game.creeps as any, creep => (creep.memory.role == "harvester"))
    const upgraders = _.
        filter(Game.creeps as any, creep => (creep.memory.role == "upgrader"))
    const builders = _.
        filter(Game.creeps as any, creep => (creep.memory.role == "builder"))

    const superHarvester_left = _.
        filter(Game.creeps as any, creep => (creep.memory.role == "superHarvester_left"))

    const superHarvester_right = _.
        filter(Game.creeps as any, creep => (creep.memory.role == "superHarvester_right"))

    const removers = _.
        filter(Game.creeps as any, creep => (creep.memory.role == "remover"))

    const repairers = _.
        filter(Game.creeps as any, creep => (creep.memory.role == "repairer"))

    if (harvesters.length < creepConfig.harvester.count && !spawn.spawning) {
        spawn.spawnCreep(creepConfig.harvester.bodys, 'harvester' + Game.time, {
            memory: {
                role: "harvester",
                spawnId: spawn.id,
            }
        })
    }
    if (upgraders.length < creepConfig.upgrader.count && !spawn.spawning) {
        spawn.spawnCreep(creepConfig.upgrader.bodys, 'upgrader' + Game.time, {
            memory: {
                role: "upgrader",
                spawnId: spawn.id
            }
        })
    }
    if (builders.length < creepConfig.builder.count && !spawn.spawning) {
        spawn.spawnCreep(creepConfig.builder.bodys, 'builder' + Game.time, {
            memory: {
                role: "builder",
                spawnId: spawn.id
            }
        })
    }

    if (superHarvester_left.length < creepConfig.superHarvester_left.count && !spawn.spawning) {
        const memorys = creepConfig.superHarvester_left.memorys
        spawn.spawnCreep(creepConfig.superHarvester_left.bodys, 'superHarvester_left' + Game.time, {
            memory: {
                role: "superHarvester_left",
                spawnId: spawn.id, ...memorys
            }
        })
    }

    if (superHarvester_right.length < creepConfig.superHarvester_right.count && !spawn.spawning) {
        const memorys = creepConfig.superHarvester_right.memorys
        spawn.spawnCreep(creepConfig.superHarvester_right.bodys, 'superHarvester_right' + Game.time, {
            memory: {
                role: "superHarvester_right",
                spawnId: spawn.id, ...memorys
            }
        })
    }

    if (removers.length < creepConfig.remover.count && !spawn.spawning) {
        const bodys = creepConfig.remover.bodys;
        spawn.spawnCreep(bodys, 'remover' + Game.time, {
            memory: {
                role: "remover",
                spawnId: spawn.id
            }
        })
    }

    if (repairers.length < creepConfig.repairer.count && !spawn.spawning) {
        const bodys = creepConfig.repairer.bodys;
        spawn.spawnCreep(bodys, 'repairer' + Game.time, {
            memory: {
                role: "repairer",
                spawnId: spawn.id
            }
        })
    }

    for (let i = 0; i < harvesters.length; i++) {
        new Harvester(harvesters[i]).work()
    }
    for (let i = 0; i < upgraders.length; i++) {
        new Upgrader(upgraders[i]).work()
    }
    for (let i = 0; i < builders.length; i++) {
        new Builder(builders[i]).work()
    }
    for (let i = 0; i < superHarvester_right.length; i++) {
        new SuperHarvesterRight(superHarvester_right[i]).work()
    }
    for (let i = 0; i < superHarvester_left.length; i++) {
        new SuperHarvesterLeft(superHarvester_left[i]).work()
    }

    for (let i = 0; i < removers.length; i++) {
        new Remover(removers[i]).work()
    }
    for (let i = 0; i < repairers.length; i++) {
        new Repairer(repairers[i]).work()
    }
}