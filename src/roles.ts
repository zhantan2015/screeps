import { build, harveste, superHarveste, upgrade, _remove, repair } from './actions'
import { Incubator } from './incubator'


export class Role {
    protected creep: Creep
    constructor(creep: Creep) {
        this.creep = creep
    }
    protected isHealthy() {
        return this.creep.ticksToLive === undefined || this.creep.ticksToLive > 10;
    }
    protected sendReborn(role: string) {
        const creep: any = this.creep
        const spawn: any = Game.getObjectById(creep.memory.spawnId)
        const incubator = new Incubator(spawn)
        incubator.addTask(role)
    }
}

export class Harvester extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const creep: any = this.creep
        if (!this.isHealthy() && !creep.memory.hasSendReborn) {
            console.log(creep.memory.hasSendReborn)
            super.sendReborn('harvester')
            creep.memory.hasSendReborn = true
        }
        if (harveste(creep) && build(creep)) {
            upgrade(creep)
        }
    }
}

export class SuperHarvesterLeft extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const creep: any = this.creep
        if (!this.isHealthy() && !creep.memory.hasSendReborn) {
            super.sendReborn('superHarvester_left')
            creep.memory.hasSendReborn = true
        }
        if (superHarveste(this.creep)) {
            creep.say('歇歇...')
            creep.moveTo(30, 18)
        }
    }
}

export class SuperHarvesterRight extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const creep: any = this.creep
        if (!this.isHealthy() && !creep.memory.hasSendReborn) {
            super.sendReborn('superHarvester_right')
            creep.memory.hasSendReborn = true
        }
        if (superHarveste(this.creep)) {
            creep.say('歇歇...')
            creep.moveTo(34, 18)
        }
    }
}

export class Upgrader extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const creep: any = this.creep
        if (!this.isHealthy() && !creep.memory.hasSendReborn) {
            super.sendReborn('harvester')
            creep.memory.hasSendReborn = true
        }
        upgrade(creep)
    }
}

export class Builder extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const creep: any = this.creep;
        if (!this.isHealthy() && !creep.memory.hasSendReborn) {
            super.sendReborn('harvester')
            creep.memory.hasSendReborn = true
        }
        if (build(creep))
            upgrade(creep)
    }
}

export class Repairer extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const creep: any = this.creep;
        if (!this.isHealthy() && !creep.memory.hasSendReborn) {
            super.sendReborn('repairer')
            creep.memory.hasSendReborn = true
        }
        repair(this.creep)
    }
}

export class Remover extends Role {
    constructor(creep: Creep) {
        super(creep)
    }
    public work() {
        const creep: any = this.creep;
        if (!this.isHealthy() && !creep.memory.hasSendReborn) {
            super.sendReborn('remover')
            creep.memory.hasSendReborn = true
        }
        if (_remove(this.creep)) {
            harveste(this.creep)
        }
    }
}