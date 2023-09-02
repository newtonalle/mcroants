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

export const setState = (prevState, newState) => Object.assign(prevState, newState)

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
            }

            state.gameState[antType].push(ant)
        }
    })
}

export const chooseAntsDirection = (state, { antType, antPhenotype, globalAnts }) => {
    state.gameState[antType].forEach(ant => {
        if (ant.alive) {
            let decidedDirection = false
            let direction = -1
            let directionsLocked = [false, false, false, false] // UP, DOWN, RIGHT, LEFT


            // EXPLORATING 

            // ** HAS TO GO FIRST IN CASE THE ANT DECIDES TO EXPLORE IN THE DIRECTION OF POISON **

            if (ant.direction === -1) {
                switch (antPhenotype[ant.id][1]) {
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

            // IDENTIFICATE NEARBY FOOD

            for (let distanceFromAnt = 1; distanceFromAnt <= antPhenotype[ant.id][0] && !decidedDirection; distanceFromAnt++) {

                // LOOKING FOR FOODS IN RANGE

                // FOUND CONSUMABLE

                POSSIBLE_DIRECTIONS.forEach(possibleDirection => {
                    if (!directionsLocked[possibleDirection]) {

                        let directionFormula = calculateDirectionFormula(possibleDirection, ant.position, distanceFromAnt)

                        if (validPosition(directionFormula, state.gameState.worldOptions.gridSize)) {

                            let identifiedTile = state.gameState.consumablesMap[directionFormula[0]][directionFormula[1]]
                            if (identifiedTile != 0) {

                                // IF THERE IS SOMETHING IN THE TILE

                                if (antPhenotype[ant.id][2] === 1 && identifiedTile === 2) {

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

                                    if (antPhenotype[foundAnt.id][3] >= antPhenotype[ant.id][3]) {

                                        // If the first ant's phenotype is higher or equal to the second's

                                        highestPhenotype = antPhenotype[foundAnt.id][3]
                                    } else {

                                        // If the second ant's phenotype is higher than the first's

                                        highestPhenotype = antPhenotype[ant.id][3]
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

            if (direction != -1) {
                ant.direction = direction
            }

        }
    })
}

export const moveAnts = (state, antType) => {
    state.gameState[antType].forEach(ant => {
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
    Object.keys(state.gameState.worldOptions.ants).forEach(antType => {
        state.gameState[antType].forEach(ant => {
            if (ant.alive) {

                // If Nothing is touched

                if (state.gameState.consumablesMap[ant.position[0]][ant.position[1]] === 0) {

                    // Food Level is reduced

                    ant.foodLevel--
                    if (ant.foodLevel <= 0) {
                        console.log(`Ant #${ant.id} died!`)
                        ant.alive = false
                        ant.deathCycle = state.gameState.currentCycle
                    }

                }

                // If Poison is touched

                if (state.gameState.consumablesMap[ant.position[0]][ant.position[1]] === 2) {
                    if (state.gameState.worldOptions.advancedOptions.poisonDisappear) {
                        state.gameState.consumablesMap[ant.position[0]][ant.position[1]] = 0
                    }
                    ant.alive = false
                    ant.deathCycle = state.gameState.currentCycle
                }

                // If the ant still is alive

                if (ant.alive) {

                    // If Food is touched

                    if (state.gameState.consumablesMap[ant.position[0]][ant.position[1]] === 1) {
                        state.gameState.consumablesMap[ant.position[0]][ant.position[1]] = 0
                        ant.foodLevel += state.gameState.worldOptions.foodValue
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
        })
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

                        if (antPhenotype[idPair[0]][3] >= antPhenotype[idPair[1]][3]) {

                            // If the first ant's phenotype is higher or equal to the second's

                            highestPhenotype = antPhenotype[idPair[0]][3]
                        } else {

                            // If the second ant's phenotype is higher than the first's

                            highestPhenotype = antPhenotype[idPair[1]][3]
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

                        switch (antPhenotype[idPair[leastHungryAnt]][4]) {
                            case 0:

                                // Don't share

                                break;

                            case 1:

                                // Always share

                                shareFood = true

                                break;

                            case 2:

                                // Shares with other ants with the allele 2

                                if (antPhenotype[idPair[hungriestAnt]][4] === 2) {
                                    shareFood = true
                                }

                                break;

                            case 3:

                                // Share with other ants with the allele 0 or 1

                                if (antPhenotype[idPair[hungriestAnt]][4] === 0 || antPhenotype[idPair[hungriestAnt]][4] === 1) {
                                    shareFood = true
                                }

                                break;

                            default:
                                break;
                        }

                        if (shareFood) {
                            friendlyRelation = true
                            let amountShared = Math.ceil((antPair[leastHungryAnt].foodLevel / 100) * BASE_FOOD_FOR_SHARING_PERCENTAGE)
                            antPair[leastHungryAnt].foodLevel -= amountShared
                            antPair[hungriestAnt].foodLevel += amountShared
                        }
                    }


                    // Relation - Combat

                    let startCombat = false

                    // Determine either or not combat will happen

                    if (!friendlyRelation) {
                        switch (antPhenotype[idPair[0]][7]) {
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

                        switch (antPhenotype[idPair[1]][7]) {
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
                            let combatPoints = [
                                0, 0
                            ]

                            combatPoints[0] = (antPhenotype[idPair[0]][8] + 1) * (Math.floor(Math.random() * antPair[0].kills) + (antPair[0].foodLevel / 10))
                            combatPoints[1] = (antPhenotype[idPair[1]][8] + 1) * (Math.floor(Math.random() * antPair[1].kills) + (antPair[1].foodLevel / 10))

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
                                antPair[winner].kills++

                                antPair[loser].alive = false
                                antPair[loser].deathCycle = state.gameState.currentCycle
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

export const breedAnts = (state, { firstParent, secondParent, antType }) => {

    // Spend food level before mating

    firstParent.foodLevel -= state.gameState.worldOptions.advancedOptions.matingCost
    secondParent.foodLevel -= state.gameState.worldOptions.advancedOptions.matingCost

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
        generation: generation,
        firstParentId: firstParent.id,
        secondParentId: secondParent.id,
        kills: 0,
    }

    state.gameState[antType].push(resultingAnt)
}

