// import { BASE_ANT } from "./constants";

const clonedeep = require('lodash.clonedeep')

const BIT_OPTIONS = [
    16,
    4,
    2,
    2,
    4,
    2,
    2,
    4,
    3
]

const BASE_FOOD_FOR_MATING = 500

const BASE_FOOD_FOR_SHARING_PERCENTAGE = 10

const POSSIBLE_DIRECTIONS = [
    0, // UP
    1, // DOWN
    2, // RIGHT
    3 // LEFT
]

const GENE_LOCUS = {
    vision: 0,
    exploration: 1,
    poisonIdentification: 2,
    foodForMating: 3,
    foodSharing: 4,
    antVision: 5,
    antEaterVision: 6,
    agression: 7,
    strength: 8,
}

const ANTEATER_VISION = 20

const ANTEATER_ENERGY_BUFFER = 3 // Proportion compared to the grid size
const ANTEATER_ENERGY_COOLDOWN = 25 // Cycles

function calculateDirectionFormula(direction, startingPosition, distance) {
    let formula = []
    switch (direction) {
        case 0:
            formula = [[startingPosition[0]], [startingPosition[1] - distance]]
            break;

        case 1:
            formula = [[startingPosition[0]], [startingPosition[1] + distance]]
            break;

        case 2:
            formula = [[startingPosition[0] + distance], [startingPosition[1]]]
            break;

        case 3:
            formula = [[startingPosition[0] - distance], [startingPosition[1]]]
            break;

        default:
            console.error("Invalid Direction!", direction)
            formula = [[startingPosition[0]], [startingPosition[1]]]
            break;
    }
    return formula
}

function validPosition(position, gridSize) {
    return position[0] >= 0 && position[1] >= 0 && position[0] <= gridSize && position[1] <= gridSize
}

function calculateOpositeDirection(direction) {

    const opositeDirection = (((direction + 1) % 2) + (Math.floor(direction / 2) * 2))

    return opositeDirection
}

function calculateParallelDirection(direction) {
    let parallelDirections = [];

    if (direction < 2) {

        // Vertical

        parallelDirections = [2, 3]

    } else {

        // Horizontal

        parallelDirections = [0, 1]

    }

    const parallelDirection = parallelDirections[Math.floor(Math.random() * 2)]

    return parallelDirection
}

function antDeath(ant, deathType, currentCycle, universeStatus) {

    console.log(`Ant #${ant.id} died! Cause: ${deathType}`)
    ant.alive = false
    ant.deathType = deathType
    universeStatus.antDeaths++
    ant.deathCycle = currentCycle
}

export const setState = (prevState, newState) => {
    location.reload()
    Object.assign(prevState, newState)
}

export const applyConfig = (state, config) => {

    state.gameState.worldOptions.consumables.foods.startingNumber = config[0].value
    state.gameState.worldOptions.consumables.foods.maxNumber = config[1].value
    state.gameState.worldOptions.consumables.poisons.startingNumber = config[2].value
    state.gameState.worldOptions.consumables.poisons.maxNumber = config[3].value
    state.gameState.worldOptions.ants.blackAnts.startingNumber = config[4].value
    state.gameState.worldOptions.ants.redAnts.startingNumber = config[5].value
    state.gameState.worldOptions.consumablesPerCycle = config[6].value
    state.gameState.worldOptions.gridSize = config[7].value
    state.gameState.worldOptions.foodValue = config[8].value
    state.gameState.worldOptions.pixelProportion = config[9].value
    state.gameState.worldOptions.poisonFoodChance = config[10].value
    state.gameState.worldOptions.antStartingFoodLevel = config[11].value
    state.gameState.worldOptions.babyAntStartingFoodLevel = config[12].value
    state.gameState.worldOptions.crossoverRate = config[13].value
    state.gameState.worldOptions.alleleMutationChance = config[14].value
    state.gameState.worldOptions.advancedOptions.minimumCombatPointDifference = config[15].value
    state.gameState.worldOptions.advancedOptions.poisonDisappear = !!config[16].value
    state.gameState.worldOptions.advancedOptions.matingCost = config[17].value
    state.gameState.worldOptions.antEaters.startingNumber = config[18].value
}

export const generateBaseWorldGrids = (state) => {

    state.gameState.simulationStarted = true

    for (let i = 0; i <= state.gameState.worldOptions.gridSize; i++) {
        let row = []

        for (let j = 0; j <= state.gameState.worldOptions.gridSize; j++) {
            row.push(0)
        }

        state.gameState.baseWorldGrid.push(row)
    }

    state.gameState.consumablesMap = state.gameState.baseWorldGrid

    for (let i = 0; i <= state.gameState.worldOptions.gridSize; i++) {
        let row = []

        for (let j = 0; j <= state.gameState.worldOptions.gridSize; j++) {
            row.push([])
        }

        state.gameState.antMap.push(row)
    }

    for (let i = 0; i <= state.gameState.worldOptions.gridSize; i++) {
        let row = []

        for (let j = 0; j <= state.gameState.worldOptions.gridSize; j++) {
            row.push([])
        }

        state.gameState.antEaterMap.push(row)
    }

}

export const addConsumablesToMap = (state) => {
    Object.keys(state.gameState.worldOptions.consumables).forEach(consumableType => {
        for (let consumables = 0; consumables < state.gameState.worldOptions.consumables[consumableType].startingNumber; consumables++) {
            let consumablePos = []
            do {
                consumablePos = [(Math.floor(Math.random() * state.gameState.worldOptions.gridSize)), (Math.floor(Math.random() * state.gameState.worldOptions.gridSize))]
            } while (state.gameState.consumablesMap[consumablePos[0]][consumablePos[1]] != 0);
            state.gameState.consumablesMap[consumablePos[0]][consumablePos[1]] = state.gameState.worldOptions.consumables[consumableType].id
        }
    })
}

export const generateAnts = (state) => {
    Object.keys(state.gameState.worldOptions.ants).forEach(antType => {
        for (let ants = 0; ants < state.gameState.worldOptions.ants[antType].startingNumber; ants++) {
            let id = state.gameState.currentHighestAntID + 1
            state.gameState.currentHighestAntID++
            let position = [(Math.floor(Math.random() * state.gameState.worldOptions.gridSize)), (Math.floor(Math.random() * state.gameState.worldOptions.gridSize))]
            let cromossomes = [
                [
                    (Math.floor(Math.random() * BIT_OPTIONS[0])),  // 0 - 15 (16)
                    (Math.floor(Math.random() * BIT_OPTIONS[1])),  // 0 - 3 (4)
                    (Math.floor(Math.random() * BIT_OPTIONS[2])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[3])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[4])),  // 0 - 3 (4)
                    (Math.floor(Math.random() * BIT_OPTIONS[5])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[6])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[7])),  // 0 - 3 (4)
                    (Math.floor(Math.random() * BIT_OPTIONS[8]))   // 0 - 2 (3)
                ],

                [
                    (Math.floor(Math.random() * BIT_OPTIONS[0])),  // 0 - 15 (16)
                    (Math.floor(Math.random() * BIT_OPTIONS[1])),  // 0 - 3 (4)
                    (Math.floor(Math.random() * BIT_OPTIONS[2])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[3])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[4])),  // 0 - 3 (4)
                    (Math.floor(Math.random() * BIT_OPTIONS[5])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[6])),  // 0 - 1 (2)
                    (Math.floor(Math.random() * BIT_OPTIONS[7])),  // 0 - 3 (4)
                    (Math.floor(Math.random() * BIT_OPTIONS[8]))   // 0 - 2 (3)
                ]
            ]

            let ant = {
                id: id,
                position: position,
                foodLevel: state.gameState.worldOptions.antStartingFoodLevel,
                type: antType,
                cromossomes: cromossomes,
                alive: true,
                direction: -1,
                age: 0,
                birthCycle: 0,
                deathCycle: -1,
                generation: 0,
                firstParentId: -1,
                secondParentId: -1,
                kills: 0,
                breedings: 0,
                highestFoodLevel: state.gameState.worldOptions.babyAntStartingFoodLevel,
                tracked: false,
            }

            state.gameState.ants.push(ant)
        }
    })
}

export const generateAntEaters = (state) => {
    for (let antEaters = 0; antEaters < state.gameState.worldOptions.antEaters.startingNumber; antEaters++) {
        let position = [(Math.floor(Math.random() * state.gameState.worldOptions.gridSize)), (Math.floor(Math.random() * state.gameState.worldOptions.gridSize))]

        let antEater = {
            position: position,
            direction: -1,
            energyCounter: ANTEATER_ENERGY_BUFFER * state.gameState.worldOptions.gridSize
        }

        state.gameState.antEaters.push(antEater)
    }
}

export const chooseAntsDirection = (state, { antPhenotype, globalAnts }) => {
    state.gameState.ants.forEach(ant => {
        if (ant.alive) {
            let decidedDirection = false
            let direction = -1
            let directionsLocked = [false, false, false, false] // UP, DOWN, RIGHT, LEFT


            // EXPLORATING 

            // ** HAS TO GO FIRST IN CASE THE ANT DECIDES TO EXPLORE IN THE DIRECTION OF POISON **

            if (ant.direction === -1) {
                switch (antPhenotype[ant.id][GENE_LOCUS.exploration]) {
                    case 0:
                        // NO MOVEMENT
                        break;

                    case 1:
                        // UP AND DOWN
                        direction = Math.floor(Math.random() * 2) // 0 - 1
                        break;

                    case 2:
                        // RIGHT AND LEFT
                        direction = Math.floor(Math.random() * 2) + 2 // 2 - 3
                        break;

                    case 3:
                        // RANDOM DIRECTION
                        direction = Math.floor(Math.random() * 4) // 0..3
                        break;

                    default:
                        console.error('Invalid value for ant exploration allele')
                        break;
                }
            }

            // UPDATES THE DIRECTION THE ANT IS WALKING TOWARDS

            // VERIFYING FOR -1, BECAUSE A LACK OF EXPLORATION STARTUP WOULD LEAD TO THE ANT CHANGING DIRECTION WHEN EXPLORING

            if (direction != -1) {
                ant.direction = direction
            }

            // IDENTIFICATE NEARBY ELEMENTS

            for (let distanceFromAnt = 1; distanceFromAnt <= antPhenotype[ant.id][GENE_LOCUS.vision] && !decidedDirection; distanceFromAnt++) {

                // LOOKING FOR ANT EATERS IN RANGE

                // FOUND ANT EATER

                if (antPhenotype[ant.id][GENE_LOCUS.antEaterVision]) {
                    POSSIBLE_DIRECTIONS.forEach(possibleDirection => {
                        let directionFormula = calculateDirectionFormula(possibleDirection, ant.position, distanceFromAnt)

                        if (validPosition(directionFormula, state.gameState.worldOptions.gridSize)) {

                            let identifiedTile = state.gameState.antEaterMap[directionFormula[0]][directionFormula[1]]

                            // FOUND ANT EATER

                            if (identifiedTile.length > 0) {
                                direction = calculateParallelDirection(possibleDirection)
                                decidedDirection = true
                            }
                        }
                    });
                }

                // LOOKING FOR FOODS IN RANGE

                // FOUND CONSUMABLE

                POSSIBLE_DIRECTIONS.forEach(possibleDirection => {
                    if (!directionsLocked[possibleDirection]) {

                        let directionFormula = calculateDirectionFormula(possibleDirection, ant.position, distanceFromAnt)

                        if (validPosition(directionFormula, state.gameState.worldOptions.gridSize)) {

                            let identifiedTile = state.gameState.consumablesMap[directionFormula[0]][directionFormula[1]]
                            if (identifiedTile != 0) {

                                // IF THERE IS SOMETHING IN THE TILE

                                if (antPhenotype[ant.id][GENE_LOCUS.poisonIdentification] === 1 && identifiedTile === 2) {

                                    // IF THERE IS POISON IN THIS DIRECTION AND THE ANT SEES IT

                                    // LOCK THE ANT'S VIEW FROM THIS DIRECTION

                                    directionsLocked[possibleDirection] = true

                                    // IF THE ANT IS GOING TOWARDS THE POISON

                                    if (ant.direction === possibleDirection) {

                                        let newDirection = possibleDirection
                                        let newDirectionFormula

                                        for (let directionsTried = 0; directionsTried < 3; directionsTried++) {

                                            // IF ALL DIRECTIONS HAVE BEEN TRIED, WALK INTO THE LAST ONE

                                            if (directionsTried === 2) {

                                                direction = newDirection
                                                decidedDirection = true
                                                return;
                                            }

                                            // TURN CLOCKWISE

                                            newDirection = (newDirection + 1) % 4

                                            // ANALYSE NEW TILE

                                            newDirectionFormula = calculateDirectionFormula(newDirection, ant.position, 1)

                                            if (validPosition(directionFormula, state.gameState.worldOptions.gridSize) && state.gameState.consumablesMap[newDirectionFormula[0]][newDirectionFormula[1]] != 2) {

                                                // IF THERE ISN'T POISON

                                                direction = newDirection
                                                decidedDirection = true
                                                return;
                                            }

                                            // IF THERE IS POISON, REPEAT
                                        }
                                    }
                                } else {

                                    // THE ANT WILL WALK TOWARDS THE CONSUMABLE

                                    direction = possibleDirection
                                    decidedDirection = true
                                }
                            }
                        }
                    }
                });

                // FOUND ANT

                if (antPhenotype[ant.id][GENE_LOCUS.antVision]) {
                    POSSIBLE_DIRECTIONS.forEach(possibleDirection => {
                        if (!directionsLocked[possibleDirection]) {

                            let directionFormula = calculateDirectionFormula(possibleDirection, ant.position, distanceFromAnt)

                            if (validPosition(directionFormula, state.gameState.worldOptions.gridSize)) {

                                let identifiedTile = state.gameState.antMap[directionFormula[0]][directionFormula[1]]

                                if (identifiedTile.length > 0) {

                                    identifiedTile.forEach(antId => {

                                        let foundAnt = globalAnts.find(findAnt => findAnt.id === antId)

                                        // ANALYSE IF OTHER ANT IS A POSSIBLE MATE


                                        // Calculate which of the ants has the highest "food for mating" phenotype

                                        let highestPhenotype

                                        if (antPhenotype[foundAnt.id][GENE_LOCUS.foodForMating] >= antPhenotype[ant.id][GENE_LOCUS.foodForMating]) {

                                            // If the first ant's phenotype is higher or equal to the second's

                                            highestPhenotype = antPhenotype[foundAnt.id][GENE_LOCUS.foodForMating]
                                        } else {

                                            // If the second ant's phenotype is higher than the first's

                                            highestPhenotype = antPhenotype[ant.id][GENE_LOCUS.foodForMating]
                                        }



                                        if (foundAnt.type === ant.type && foundAnt.foodLevel > BASE_FOOD_FOR_MATING * (highestPhenotype + 1) && ant.foodLevel > BASE_FOOD_FOR_MATING * (highestPhenotype + 1)) {

                                            // TRY TO APROACH POSSIBLE MATE

                                            if (foundAnt.direction === calculateOpositeDirection(possibleDirection) && distanceFromAnt === 1) {
                                                direction = -1
                                                ant.direction = direction
                                            } else {
                                                direction = possibleDirection
                                            }

                                            decidedDirection = true
                                        }




                                    });
                                }
                            }
                        }
                    });
                }
            }

            if (direction != -1) {
                ant.direction = direction
            }

        }
    })
}

export const moveAnts = (state) => {
    state.gameState.ants.forEach(ant => {
        if (ant.alive) {
            let oldAntPosition = clonedeep(ant.position)

            switch (ant.direction) {
                case -1:
                    // NO MOVEMENT
                    break;

                case 0:
                    // UP
                    ant.position[1]--
                    if (ant.position[1] < 0) {
                        ant.position[1]++
                        ant.direction = 2
                    }
                    break;

                case 1:
                    // DOWN
                    ant.position[1]++
                    if (ant.position[1] >= state.gameState.worldOptions.gridSize) {
                        ant.position[1]--
                        ant.direction = 3
                    }
                    break;

                case 2:
                    // RIGHT
                    ant.position[0]++
                    if (ant.position[0] >= state.gameState.worldOptions.gridSize) {
                        ant.position[0]--
                        ant.direction = 1
                    }
                    break;

                case 3:
                    // LEFT
                    ant.position[0]--
                    if (ant.position[0] < 0) {
                        ant.position[0]++
                        ant.direction = 0
                    }
                    break;

                default:
                    console.error('Invalid value for ant movement direction')
                    break;
            }

            ant.position.push()

            // Map out the ant

            // Old Location Removal

            let antIndex = state.gameState.antMap[oldAntPosition[0]][oldAntPosition[1]].indexOf(ant.id)
            state.gameState.antMap[oldAntPosition[0]][oldAntPosition[1]].splice(antIndex, 1)


            // New Location Addition

            state.gameState.antMap[ant.position[0]][ant.position[1]].push(ant.id)

        }
    });
}

export const updateCycleValues = (state, { globalAnts, antPhenotype }) => {
    state.gameState.ants.forEach(ant => {
        if (ant.alive) {

            // If Nothing is touched

            if (state.gameState.consumablesMap[ant.position[0]][ant.position[1]] === 0) {

                // Food Level is reduced

                ant.foodLevel--
                if (ant.foodLevel <= 0) {
                    antDeath(ant, "STARVATION", state.gameState.currentCycle, state.gameState.universeStatus)
                }

            }

            // If Poison is touched

            if (ant.alive) {
                if (state.gameState.consumablesMap[ant.position[0]][ant.position[1]] === 2) {
                    if (state.gameState.worldOptions.advancedOptions.poisonDisappear) {
                        state.gameState.consumablesMap[ant.position[0]][ant.position[1]] = 0
                    }
                    state.gameState.universeStatus.poisonEaten++
                    antDeath(ant, "POISONING", state.gameState.currentCycle, state.gameState.universeStatus)
                    /*                    console.log(`Ant #${ant.id} died of poisoning!`)
                                        ant.alive = false
                                        state.gameState.universeStatus.antDeaths++
                                        ant.deathCycle = state.gameState.currentCycle */
                }
            }

            // If Ant Eater is touched

            if (ant.alive) {
                if (state.gameState.antEaterMap[ant.position[0]][ant.position[1]].length > 0) {
                    antDeath(ant, "EATEN BY ANTEATER", state.gameState.currentCycle, state.gameState.universeStatus)
                    /* state.gameState.universeStatus.antsEaten++
                    ant.alive = false
                    state.gameState.universeStatus.antDeaths++
                    ant.deathCycle = state.gameState.currentCycle */
                }
            }

            // If the ant still is alive

            if (ant.alive) {

                // If Food is touched

                if (state.gameState.consumablesMap[ant.position[0]][ant.position[1]] === 1) {
                    state.gameState.consumablesMap[ant.position[0]][ant.position[1]] = 0
                    state.gameState.universeStatus.foodEaten++
                    ant.foodLevel += state.gameState.worldOptions.foodValue
                    if (ant.foodLevel > ant.highestFoodLevel) {
                        ant.highestFoodLevel = ant.foodLevel
                    }
                    ant.direction = -1
                }
            } else {
                let antIndex = state.gameState.antMap[ant.position[0]][ant.position[1]].findIndex((antId) => antId === ant.id)
                state.gameState.antMap[ant.position[0]][ant.position[1]].splice(antIndex, 1)
            }

            ant.age++
            state.gameState.consumablesMap.push()
            state.gameState.antMap.push()
        }
    });

    state.gameState.antMap.forEach((row) => {
        row.forEach((col) => {

            // If there is more than one ant occupying one tile

            if (col.length >= 2) {

                // Separate more than two ants into pairs

                for (let pairIndex = 0; pairIndex < Math.floor(col.length / 2); pairIndex++) {

                    // Defining pairs

                    let idPair = [col[pairIndex * 2], col[1 + (pairIndex * 2)]]
                    let antPair = [(globalAnts.find(ant => ant.id === idPair[0])), (globalAnts.find(ant => ant.id === idPair[1]))]


                    // Relation Order:

                    // Breeding

                    // Try sharing
                    // If sharing doesn't happen:

                    // Try combat

                    let friendlyRelation = false

                    // Relation - Breed
                    if (antPair[0].type === antPair[1].type) {

                        // Calculate which of the ants has the highest "food for mating" phenotype

                        let highestPhenotype

                        if (antPhenotype[idPair[0]][GENE_LOCUS.foodForMating] >= antPhenotype[idPair[1]][GENE_LOCUS.foodForMating]) {

                            // If the first ant's phenotype is higher or equal to the second's

                            highestPhenotype = antPhenotype[idPair[0]][GENE_LOCUS.foodForMating]
                        } else {

                            // If the second ant's phenotype is higher than the first's

                            highestPhenotype = antPhenotype[idPair[1]][GENE_LOCUS.foodForMating]
                        }

                        if (antPair[0].foodLevel > BASE_FOOD_FOR_MATING * (highestPhenotype + 1) && antPair[1].foodLevel > BASE_FOOD_FOR_MATING * (highestPhenotype + 1)) {
                            state.gameState.antPairs.push(antPair)
                        }
                    }

                    // Relation - Share

                    // Find out which ant needs food the most

                    let hungriestAnt = -1
                    let leastHungryAnt = -1

                    if (antPair[0].foodLevel < antPair[1].foodLevel) {
                        hungriestAnt = 0
                        leastHungryAnt = 1
                    } else if (antPair[1].foodLevel < antPair[0].foodLevel) {
                        hungriestAnt = 1
                        leastHungryAnt = 0
                    }

                    if (hungriestAnt != -1) {

                        let shareFood = false

                        switch (antPhenotype[idPair[leastHungryAnt]][GENE_LOCUS.foodSharing]) {
                            case 0:

                                // Don't share

                                break;

                            case 1:

                                // Always share

                                shareFood = true

                                break;

                            case 2:

                                // Shares with other ants with the allele 2

                                if (antPhenotype[idPair[hungriestAnt]][GENE_LOCUS.foodSharing] === 2) {
                                    shareFood = true
                                }

                                break;

                            case 3:

                                // Share with other ants with the allele 0 or 1

                                if (antPhenotype[idPair[hungriestAnt]][GENE_LOCUS.foodSharing] === 0 || antPhenotype[idPair[hungriestAnt]][GENE_LOCUS.foodSharing] === 1) {
                                    shareFood = true
                                }

                                break;

                            default:
                                break;
                        }

                        if (shareFood) {
                            friendlyRelation = true
                            let amountShared = Math.ceil((antPair[leastHungryAnt].foodLevel / 100) * BASE_FOOD_FOR_SHARING_PERCENTAGE)
                            state.gameState.universeStatus.foodPointsShared += amountShared
                            antPair[leastHungryAnt].foodLevel -= amountShared
                            antPair[hungriestAnt].foodLevel += amountShared
                            if (antPair[hungriestAnt].foodLevel > antPair[hungriestAnt].highestFoodLevel) {
                                antPair[hungriestAnt].highestFoodLevel = antPair[hungriestAnt].foodLevel
                            }
                        }
                    }


                    // Relation - Combat

                    let startCombat = false

                    // Determine either or not combat will happen

                    if (!friendlyRelation) {
                        switch (antPhenotype[idPair[0]][GENE_LOCUS.agression]) {
                            case 0:

                                break;

                            case 1:
                                if (antPair[1].type === "redAnts") {
                                    startCombat = true
                                }
                                break;

                            case 2:
                                if (antPair[1].type === "blackAnts") {
                                    startCombat = true
                                }
                                break;

                            case 3:
                                startCombat = true
                                break;

                            default:

                                console.error("Invalid allele value")
                                break;
                        }

                        switch (antPhenotype[idPair[1]][GENE_LOCUS.agression]) {
                            case 0:

                                break;

                            case 1:
                                if (antPair[0].type === "redAnts") {
                                    startCombat = true
                                }
                                break;

                            case 2:
                                if (antPair[0].type === "blackAnts") {
                                    startCombat = true
                                }
                                break;

                            case 3:
                                startCombat = true
                                break;

                            default:

                                console.error("Invalid allele value")
                                break;
                        }

                        // In case of combat

                        if (startCombat) {

                            state.gameState.universeStatus.fightsOccurred++

                            let combatPoints = [
                                0, 0
                            ]

                            combatPoints[0] = (antPhenotype[idPair[0]][GENE_LOCUS.strength] + 1) * (Math.floor(Math.random() * antPair[0].kills) + (antPair[0].foodLevel / 10))
                            combatPoints[1] = (antPhenotype[idPair[1]][GENE_LOCUS.strength] + 1) * (Math.floor(Math.random() * antPair[1].kills) + (antPair[1].foodLevel / 10))

                            let winner = -1
                            let loser = -1

                            if (combatPoints[0] >= (combatPoints[1] + state.gameState.worldOptions.advancedOptions.minimumCombatPointDifference)) {
                                winner = 0
                                loser = 1
                            } else if (combatPoints[1] >= (combatPoints[0] + state.gameState.worldOptions.advancedOptions.minimumCombatPointDifference)) {
                                winner = 1
                                loser = 0
                            }

                            if (winner != -1) {
                                antPair[winner].foodLevel += antPair[loser].foodLevel
                                state.gameState.universeStatus.antKills++
                                antPair[winner].kills++

                                console.log(`Ant #${antPair[loser].id} was killed by ${antPair[winner].id}!`)
                                antDeath(antPair[loser], "KILLED BY ANT", state.gameState.currentCycle, state.gameState.universeStatus)
                                /* antPair[loser].alive = false
                                 state.gameState.universeStatus.antDeaths++
                                 antPair[loser].deathCycle = state.gameState.currentCycle
                                 */
                                let antIndex = state.gameState.antMap[antPair[loser].position[0]][antPair[loser].position[1]].findIndex((antId) => antId === antPair[loser].id)
                                state.gameState.antMap[antPair[loser].position[0]][antPair[loser].position[1]].splice(antIndex, 1)

                            }

                        }
                    }

                    antPair[0].direction = -1
                    antPair[1].direction = -1
                }
            }
        });
    });
}

export const spawnNewConsumables = (state, { foodAmount, poisonAmount }) => {
    for (let consumables = 0; consumables < state.gameState.worldOptions.consumablesPerCycle; consumables++) {
        let consumablesPos = []
        do {
            consumablesPos = [(Math.floor(Math.random() * state.gameState.worldOptions.gridSize)), (Math.floor(Math.random() * state.gameState.worldOptions.gridSize))]
        } while (state.gameState.consumablesMap[consumablesPos[0]][consumablesPos[1]] != 0);

        if (Math.floor(Math.random() * 1000) < state.gameState.worldOptions.poisonFoodChance) {
            if (poisonAmount < state.gameState.worldOptions.consumables.poisons.maxNumber) {
                state.gameState.consumablesMap[consumablesPos[0]][consumablesPos[1]] = 2
            }
        } else {
            if (foodAmount < state.gameState.worldOptions.consumables.foods.maxNumber) {
                state.gameState.consumablesMap[consumablesPos[0]][consumablesPos[1]] = 1
            }
        }

        state.gameState.consumablesMap.push()
    }
}

export const breedAnts = (state, { firstParent, secondParent }) => {

    // Spend food level before mating

    firstParent.foodLevel -= state.gameState.worldOptions.advancedOptions.matingCost
    secondParent.foodLevel -= state.gameState.worldOptions.advancedOptions.matingCost

    state.gameState.universeStatus.breedingsOccurred++
    firstParent.breedings++
    secondParent.breedings++

    let id = state.gameState.currentHighestAntID + 1
    state.gameState.currentHighestAntID++
    let position = [(Math.floor(Math.random() * state.gameState.worldOptions.gridSize)), (Math.floor(Math.random() * state.gameState.worldOptions.gridSize))]


    let firstParentMainCromossome = (Math.floor(Math.random() * 2))
    let secondParentMainCromossome = (Math.floor(Math.random() * 2))

    // 0 to 1 and 1 to 0 conversion

    let firstParentSecondaryCromossome = ((firstParentMainCromossome + 1) % 2)
    let secondParentSecondaryCromossome = ((secondParentMainCromossome + 1) % 2)

    let startingPoint = (Math.floor(Math.random() * BIT_OPTIONS.length)) // 0 - 8 in 9 BITS

    let range = (Math.floor(Math.random() * (BIT_OPTIONS.length - startingPoint) + 1)) // 1 - 9
    // Ex. 9 - 8 - 1 = 0; Math.random * 0 = 0, 0 + 1 = 1; 9 - 5 - 1 = 3; Math.random * 3 = 0 to 2; 0 to 2 + 1 = 1 to 3; 9 - 0 - 1 = 8; Math.random * 8 = 0 to 7; 0 to 7 + 1 = 1 to 8

    if (range === 9) { // It may never cross over the entire cromossome
        range--
    }

    let cromossomes = [

        // First parent inherited alleles

        [
            firstParent.cromossomes[firstParentMainCromossome][0],  // 0 - 15 (16)
            firstParent.cromossomes[firstParentMainCromossome][1],  // 0 - 3 (4)
            firstParent.cromossomes[firstParentMainCromossome][2],  // 0 - 1 (2)
            firstParent.cromossomes[firstParentMainCromossome][3],  // 0 - 1 (2)
            firstParent.cromossomes[firstParentMainCromossome][4],  // 0 - 3 (4)
            firstParent.cromossomes[firstParentMainCromossome][5],  // 0 - 1 (2)
            firstParent.cromossomes[firstParentMainCromossome][6],  // 0 - 1 (2)
            firstParent.cromossomes[firstParentMainCromossome][7],  // 0 - 3 (4)
            firstParent.cromossomes[firstParentMainCromossome][8]   // 0 - 2 (3)
        ],

        // Second parent inherited alleles

        [
            secondParent.cromossomes[secondParentMainCromossome][0],  // 0 - 15 (16)
            secondParent.cromossomes[secondParentMainCromossome][1],  // 0 - 3 (4)
            secondParent.cromossomes[secondParentMainCromossome][2],  // 0 - 1 (2)
            secondParent.cromossomes[secondParentMainCromossome][3],  // 0 - 1 (2)
            secondParent.cromossomes[secondParentMainCromossome][4],  // 0 - 3 (4)
            secondParent.cromossomes[secondParentMainCromossome][5],  // 0 - 1 (2)
            secondParent.cromossomes[secondParentMainCromossome][6],  // 0 - 1 (2)
            secondParent.cromossomes[secondParentMainCromossome][7],  // 0 - 3 (4)
            secondParent.cromossomes[secondParentMainCromossome][8]   // 0 - 2 (3)
        ]
    ]

    // Mutations applied to 1st cromossome

    cromossomes[0].forEach((cromossome, index) => {
        if (Math.floor(Math.random() * 10000) < state.gameState.worldOptions.alleleMutationChance) {
            cromossome = (Math.floor(Math.random() * BIT_OPTIONS[index]))
        }
    });

    // Mutations applied to 2nd cromossome

    cromossomes[1].forEach((cromossome, index) => {
        if (Math.floor(Math.random() * 10000) < state.gameState.worldOptions.alleleMutationChance) {
            cromossome = (Math.floor(Math.random() * BIT_OPTIONS[index]))
        }
    });


    if (state.gameState.worldOptions.crossoverRate > (Math.random() * 100)) {

        // Crossing Over applied to 1st cromossome

        for (let index = 0; index < range; index++) {
            cromossomes[0][index + startingPoint] = firstParent.cromossomes[firstParentSecondaryCromossome][index + startingPoint]
        }

        // Crossing Over applied to 2nd cromossome

        for (let index = 0; index < range; index++) {
            cromossomes[1][index + startingPoint] = secondParent.cromossomes[secondParentSecondaryCromossome][index + startingPoint]
        }
    }

    // Please note that an actual genetic mutation does not work like this, they happen when the cell is replicating to make a gamete, but
    // misses one of the elements in the DNA sequence, and also that the crossing over also occurs during the making of the gamete, not after
    // it is made

    let generation = 0

    if (firstParent.generation >= secondParent.generation) {
        generation = (firstParent.generation + 1)
    } else {
        generation = (secondParent.generation + 1)
    }

    let type = firstParent.type

    let resultingAnt = {
        id: id,
        type: type,
        position: position,
        foodLevel: state.gameState.worldOptions.babyAntStartingFoodLevel,
        cromossomes: cromossomes,
        alive: true,
        direction: -1,
        age: 0,
        birthCycle: state.gameState.currentCycle,
        deathCycle: -1,
        deathType: "",
        generation: generation,
        firstParentId: firstParent.id,
        secondParentId: secondParent.id,
        kills: 0,
        breedings: 0,
        highestFoodLevel: state.gameState.worldOptions.babyAntStartingFoodLevel,
        tracked: false,
    }

    state.gameState.ants.push(resultingAnt)
}


export const trackAnt = (state, { globalAnts, id }) => {
    globalAnts.find((ant) => ant.id === id).tracked = !globalAnts.find((ant) => ant.id === id).tracked
}

export const createAnt = (state, antData) => {

    let id = state.gameState.currentHighestAntID + 1

    let resultingAnt = {
        id: id,
        type: antData.type,
        position: antData.position,
        foodLevel: Number(antData.foodLevel),
        cromossomes: antData.cromossomes,
        alive: true,
        direction: -1,
        age: 0,
        birthCycle: state.gameState.currentCycle,
        deathCycle: -1,
        deathType: "",
        generation: 0,
        firstParentId: -2,
        secondParentId: -2,
        kills: antData.kills,
        breedings: 0,
        highestFoodLevel: antData.foodLevel,
        tracked: false,
    }

    state.gameState.currentHighestAntID++

    state.gameState.ants.push(resultingAnt)
}

export const chooseAntEatersDirection = (state) => {
    state.gameState.antEaters.forEach(antEater => {
        antEater.energyCounter--
        if (antEater.energyCounter > 0) {
            let decidedDirection = false
            let direction = -1

            // EXPLORATING 

            if (antEater.direction === -1) {

                direction = Math.floor(Math.random() * 4) // 0..3

            }

            if (direction != -1) {
                antEater.direction = direction
            }

            for (let distanceFromAntEater = 1; distanceFromAntEater <= ANTEATER_VISION && !decidedDirection; distanceFromAntEater++) {

                // LOOKING FOR ANTS IN RANGE

                POSSIBLE_DIRECTIONS.forEach(possibleDirection => {
                    let directionFormula = calculateDirectionFormula(possibleDirection, antEater.position, distanceFromAntEater)

                    if (validPosition(directionFormula, state.gameState.worldOptions.gridSize)) {

                        let identifiedTile = state.gameState.antMap[directionFormula[0]][directionFormula[1]]

                        // FOUND ANT

                        if (identifiedTile.length > 0) {
                            direction = possibleDirection
                            decidedDirection = true
                        }
                    }
                });
            }

            if (direction != -1) {
                antEater.direction = direction
            }
        } else {
            antEater.direction = -1
            if (antEater.energyCounter <= -ANTEATER_ENERGY_COOLDOWN) {
                antEater.energyCounter = ANTEATER_ENERGY_BUFFER * state.gameState.worldOptions.gridSize
            }
        }
    })
}

export const moveAntEaters = (state) => {
    state.gameState.antEaters.forEach(antEater => {
        let oldAntEaterPosition = clonedeep(antEater.position)

        switch (antEater.direction) {
            case -1:
                // NO MOVEMENT
                break;

            case 0:
                // UP
                antEater.position[1]--
                if (antEater.position[1] < 0) {
                    antEater.position[1]++
                    antEater.direction = 2
                }
                break;

            case 1:
                // DOWN
                antEater.position[1]++
                if (antEater.position[1] >= state.gameState.worldOptions.gridSize) {
                    antEater.position[1]--
                    antEater.direction = 3
                }
                break;

            case 2:
                // RIGHT
                antEater.position[0]++
                if (antEater.position[0] >= state.gameState.worldOptions.gridSize) {
                    antEater.position[0]--
                    antEater.direction = 1
                }
                break;

            case 3:
                // LEFT
                antEater.position[0]--
                if (antEater.position[0] < 0) {
                    antEater.position[0]++
                    antEater.direction = 0
                }
                break;

            default:
                console.error('Invalid value for antEater movement direction')
                break;
        }

        antEater.position.push()

        // Map out the antEater

        // Old Location Removal

        let antEaterIndex = state.gameState.antEaterMap[oldAntEaterPosition[0]][oldAntEaterPosition[1]].indexOf(antEater.id)
        state.gameState.antEaterMap[oldAntEaterPosition[0]][oldAntEaterPosition[1]].splice(antEaterIndex, 1)


        // New Location Addition

        state.gameState.antEaterMap[antEater.position[0]][antEater.position[1]].push(antEater.id)
    });
}
