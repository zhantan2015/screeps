import creepConfig from './creepConfig'
import _ from 'lodash'

export class Incubator {
    private spawn: StructureSpawn
    private taskList: string[]
    constructor(spawn: StructureSpawn) {
        this.spawn = spawn
        const s: any = this.spawn
        this.taskList = s.memory.taskList
    }
    private work() {
        if (!this.taskList || this.taskList.length == 0 || this.spawn.spawning) return
        const role = this.taskList.shift()
        const count = creepConfig[role].count;
        const _count = _.filter(Game.creeps, (creep: any) => creep.memory.role == role && !creep.memory.hasSendReborn).length
        if (_count >= count) return
        const bodys = creepConfig[role].bodys;
        const memorys = creepConfig[role].memorys;
        const memory = memorys ? { spawnId: this.spawn.id, ...memorys } : { spawnId: this.spawn.id }
        this.spawn.spawnCreep(bodys,
            role + Game.time,
            { memory }
        )
    }
    public addTask(role: string) {
        this.taskList.push(role)
    }
}