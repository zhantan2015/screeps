import init from "./init"

export const loop = () => {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name])
            delete Memory.creeps[name]
    }
    init()
}