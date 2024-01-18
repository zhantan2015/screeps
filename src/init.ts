import _ from 'lodash'
import { Builder, Harvester, Upgrader, Repairer, SuperHarvesterLeft, SuperHarvesterRight, Remover } from './roles'
import creepConfig from './creepConfig'
import { Incubator } from './incubator'

export default () => {
    const harvesters = _.filter(Game.creeps, (creep: any) => creep.memory.role == "harvester")
    if (harvesters.length < creepConfig.harvester.count) new Incubator(Game.spawns["Spawn1"]).work("harvester")
    harvesters.forEach(creep => new Harvester(creep).work().reborn())

    const upgraders = _.filter(Game.creeps, (creep: any) => creep.memory.role == "upgrader")
    if (upgraders.length < creepConfig.upgrader.count) new Incubator(Game.spawns["Spawn1"]).work("upgrader")
    upgraders.forEach(creep => new Upgrader(creep).work().reborn())

    const builders = _.filter(Game.creeps, (creep: any) => creep.memory.role == "builder")
    if (builders.length < creepConfig.builder.count) new Incubator(Game.spawns["Spawn1"]).work("builder")
    builders.forEach(creep => new Builder(creep).work().reborn())

    const repairers = _.filter(Game.creeps, (creep: any) => creep.memory.role == "repairer")
    if (repairers.length < creepConfig.repairer.count) new Incubator(Game.spawns["Spawn1"]).work("repairer")
    repairers.forEach(creep => new Repairer(creep).work().reborn())

    const superHarvester_left = _.filter(Game.creeps, (creep: any) => creep.memory.role == "superHarvester_left")
    if (superHarvester_left.length < creepConfig.superHarvester_left.count) new Incubator(Game.spawns["Spawn1"]).work("superHarvester_left")
    superHarvester_left.forEach(creep => new SuperHarvesterLeft(creep).work().reborn())

    const superHarvester_right = _.filter(Game.creeps, (creep: any) => creep.memory.role == "superHarvester_right")
    if (superHarvester_right.length < creepConfig.superHarvester_right.count) new Incubator(Game.spawns["Spawn1"]).work("superHarvester_right")
    superHarvester_right.forEach(creep => new SuperHarvesterRight(creep).work().reborn())

    const removers = _.filter(Game.creeps, (creep: any) => creep.memory.role == "remover")
    if (removers.length < creepConfig.remover.count) new Incubator(Game.spawns["Spawn1"]).work("remover")
    removers.forEach(creep => new Remover(creep).work().reborn())
}