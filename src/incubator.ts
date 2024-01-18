import creepConfig from './creepConfig'
import _ from 'lodash'

export class Incubator {
    spawn: StructureSpawn
    constructor(spawn: StructureSpawn) {
        this.spawn = spawn
    }
    public work(role: string) {
        const bodys = creepConfig[role].bodys
        const memorys = creepConfig[role].memorys
        const memory = memorys ? { role, ...memorys } : { role }
        if (!this.spawn.spawning) {
            this.spawn.spawnCreep(bodys, role + Game.time, { memory })
        }
    }
}