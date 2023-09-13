import defaultState from './state'

export const resetState = (context) => context.commit('setState', defaultState())

export const applyConfig = (context, config) => {
    context.commit('applyConfig', config)
}

export const environmentSetup = (context) => {
    context.commit('generateBaseWorldGrids')
    context.commit('addConsumablesToMap')
    context.commit('generateAnts')
}

export const cycleStep = async (context) => {
    context.state.gameState.currentCycle++
    context.commit('spawnNewConsumables', { foodAmount: context.getters.getFoods.length, poisonAmount: context.getters.getPoisons.length })
    Object.keys(context.state.gameState.worldOptions.ants).forEach(antType => {
        context.commit('chooseAntsDirection', { antType, antPhenotype: context.getters.getAntPhenotype, globalAnts: context.getters.getGlobalAnts })
        context.commit('moveAnts', antType)
    });
    context.commit('updateCycleValues', { globalAnts: context.getters.getGlobalAnts, antPhenotype: context.getters.getAntPhenotype })
    context.state.gameState.antPairs.forEach(antPair => {
        context.commit('breedAnts', { firstParent: antPair[0], secondParent: antPair[1], antType: antPair[0].type })
    });
    context.state.gameState.antPairs = []
    context.state.gameState.antPairs.push()
}


export const breedAnts = (context, { firstParentId, secondParentId, antType }) => {
    const firstParent = context.state.gameState[antType][firstParentId]
    const secondParent = context.state.gameState[antType][secondParentId]

    context.commit('breedAnts', { firstParent, secondParent, antType })
}

export const trackAnt = (context, id) => {
    context.commit('trackAnt', { globalAnts: context.getters.getGlobalAnts, id: id })
}