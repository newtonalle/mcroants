import { CONFIG_DESCRIPTION } from './constants.js'

export const getSimulationStarted = (state) => state.gameState.simulationStarted

export const getConfigDescription = () => CONFIG_DESCRIPTION

export const getRedAnts = (state) => state.gameState.redAnts

export const getBlackAnts = (state) => state.gameState.blackAnts

export const getAntPhenotype = (state) => {

    // Organized by order of ID

    let phenotypesById = []

    for (let index = 0; index < state.gameState.currentHighestAntID; index++) {
        phenotypesById.push(0)

    }

    Object.keys(state.gameState.worldOptions.ants).forEach((antType) => {
        state.gameState[antType].forEach((ant) => {

            let antPhenotype = []

            for (let alleleType = 0; alleleType < ant.cromossomes[0].length; alleleType++) {

                let dominantAllele

                if (ant.cromossomes[0][alleleType] >= ant.cromossomes[1][alleleType]) {

                    // The dominant allele is either the first cromossome's, or they are equal, so it doesn't matter

                    dominantAllele = ant.cromossomes[0][alleleType]
                } else {

                    // The dominant allele is the second cromossome's

                    dominantAllele = ant.cromossomes[1][alleleType]
                }


                antPhenotype.push(dominantAllele)

            }


            phenotypesById[ant.id] = antPhenotype
        });
    });

    return phenotypesById
}

export const getFoods = (state) => {
    let foods = []

    state.gameState.consumablesMap.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if (column === 1) {
                foods.push([rowIndex, columnIndex])
            }
        });
    });

    return foods
}

export const getPoisons = (state) => {
    let poisons = []

    state.gameState.consumablesMap.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            if (column === 2) {
                poisons.push([rowIndex, columnIndex])
            }
        });
    });

    return poisons
}

export const getGlobalAnts = (state) => {
    let globalAnts = []

    Object.keys(state.gameState.worldOptions.ants).forEach(antType => {
        globalAnts.push(...state.gameState[antType])
    });

    return globalAnts
}

export const getAntEaters = (state) => state.gameState.antEaters

export const getWorldOptions = (state) => state.gameState.worldOptions

export const getCurrentCycle = (state) => state.gameState.currentCycle