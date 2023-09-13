export const BASE_ANT = {
    id: 0,  // Identifier for the ant
    position: [], // [X, Y] Being X the horizontal distance of the left border and Y the vertical distance from the top border
    foodLevel: 500, // A timer for the ant's lifespan, eating food will raise it
    type: 'redAnts', // Identifies some of the ant's relations with other ants (consider it as different species, not as a color difference)
    cromossomes: [

        // FIRST CROMOSSOME

        [
            0,      // BIT #1 (0..15)
            0,      // BIT #2 (0..3)
            0,      // BIT #3 (0-1)
            0,      // BIT #4 (0-1)
            0,      // BIT #5 (0..3)
            0,      // BIT #6 (0-1)
            0,      // BIT #7 (0-1)
            0,      // BIT #8 (0..3)
            0,      // BIT #9 (0..2)
        ],

        // SECOND CROMOSSOME

        [
            0,      // BIT #1 (0..15)
            0,      // BIT #2 (0..3)
            0,      // BIT #3 (0-1)
            0,      // BIT #4 (0-1)
            0,      // BIT #5 (0..3)
            0,      // BIT #6 (0-1)
            0,      // BIT #7 (0-1)
            0,      // BIT #8 (0..3)
            0,      // BIT #9 (0..2)
        ]

        // Highest numbered alleles are DOMINANT over lower numbered ones
    ],

    alive: true, // Ant's current living status

    direction: -1, // The direction the ant will move

    age: 0, // The ant's age (in clycles)

    birthCycle: 0, // The birth cycle of the ant

    deathCycle: -1, // The death cycle of the ant

    generation: 0, // How far this family of ants has gone

    firstParentId: -1, // The ID of the ant's first parent (-1 refers to ants that spawned when the simulation started)

    secondParentId: -1, // The ID of the ant's second parent (-1 refers to ants that spawned when the simulation started)

    kills: 0, // The number of ants killed by this ant

    breedings: 0, // The number of breedings that happened with this ant

    highestFoodLevel: 0, // The highest number of food levels this ant ever had

    tracked: false, // Either or not the current ant is being tracked (changing its color)
}

export const BASE_ANTEATER = {
    position: [],
}

export const BASE_CONFIG = [
    0, // foodStartingNumber
    20, // foodMaxNumber
    0, // poisonStartingNumber
    0, // poisonMaxNumber 
    2, // blackAntsStartingNumber
    2, // redAntsStartingNumber
    1, // consumablesPerCycle
    25, // gridSize 
    10, // foodValue
    10, // pixelProportion
    0,  // poisonFoodChance
    1000, // antStartingFoodLevel 
    200, // babyAntStartingFoodLevel
    1, //  crossoverRate
    100, // alleleMutationChance
    100, // minimumCombatPointDifference
    false, // poisonDisappear
    500, // matingCost

]

export const CONFIG_DESCRIPTION = {
    foodStartingNumber: "The number of food consumables that will appear on the beginning of the simulation (can be helpful to start small ant populations)",
    foodMaxNumber: "The maximum number of food consumables that may exist on the simulation at the same time",
    poisonStartingNumber: "The number of poison consumables that will appear at the beginning of the simulation (can be used to make 'ant traps')",
    poisonMaxNumber: "The maximum number of poison consumables that may exist on the simulation at the same time",
    blackAntsStartingNumber: "The number of ants of the black type that will appear on the beggining of the simulation",
    redAntsStartingNumber: "The number of ants of the red type that will appear on the beggining of the simulation",
    consumablesPerCycle: "The number of consumable that will be generated per cycle on the simulation (either or not the consumable is a poison will be determined by the 'poisonous food' configuration",
    gridSize: "The size of the sides of the simulation's grid (square it to get the total number of tiles)",
    foodValue: "The value each piece of food provides to an ant when eaten (each point in that value will make the ant survive 1 cycle longer)",
    pixelProportion: "The proportion from the grid's actual size (in pixels) to what you see in the screen (this can help you see the simulation better, without having to zoom in)",
    poisonFoodChance: "The chance any given consumble being spawned in a cycle is a poison consumable, instead of a food one",
    antStartingFoodLevel: "The amount of food points an ant will have when starting the simulation",
    babyAntStartingFoodLevel: "The amount of food points a baby ant will recieve when born",
    crossoverRate: "The chance of any given cromossome pair being affected by crossover during reproduction",
    alleleMutationChance: "The chance of any given allele mutating during reproduction",
    minimumCombatPointDifference: "The minimal difference beetwen combat points so that the battle has a winner (see more in DOCUMENTATION on the top of the screen)",
    poisonDisappear: "Whether or not poison consumables disappear after being consumed",
    matingCost: "The cost required for ants to create offspring",

}

//                 ALLELE TYPE TABLE

/* BIT 1:                          FUNCTION - VISION

              0                       ant is blind
              1                ant can see 1 square away
              2                ant can see 2 squares away
              3                "    "   "  3    "     "
              :                            :
              :                            :
              15               "   "    "  15   "     "


BIT 2:                           FUNCTION - EXPLORATION

               0               ant will not move
               1               ant moves up and down
               2               ant moves right and left
               3               ant moves in a random direction


                             FUNCTION - POISON IDENTIFICATION

BIT 3:         0                ant will not avoid poison
               1                ant will avoid poison


                                FUNCTION - FOOD FOR MATING

BIT 4:         0                ant will mate if food level > 500
               1                 "   "    "   "   "     "   > 1000


                                     FUNCTION - FOOD SHARING

BIT 5:        0               ant never shares its food
               1                "  always  "     "   "
               2               ant only shares its food if the other
                                 ant's 5 BIT == 2
               3               ant only shares its food if the other
                                  ant's 5 BIT == 1 || 3


                                    FUNCTION - ANT VISION

BIT 6:         0                ant CANNOT see other ants
               1                ant CAN see other ants


                                    FUNCTION - ANTEATER VISION

BIT 7:         0                ant CANNOT see an anteater
               1                ant CAN see an anteater


                                     FUNCTION - AGRESSION

BIT 8:        0               ant NEVER attacks
               1               ant only attacks red ants
               2               ant only attacks black ants
               3               ant attacks both red & black ants


                                    FUNCTION - STRENGTH

BIT 9:        0                      strength = 1
               1                      strength = 2
               2                      strength = 3
*/


// BACKUP

/*
                                     // FOUND CONSUMABLE (UP)
                 
                                     if (!directionsLocked[0]) {
                                         if (ant.position[1] - distanceFromAnt >= 0) {
                                             if (state.gameState.consumablesMap[ant.position[0]][ant.position[1] - distanceFromAnt] > 0) {
                 
                                                 // FOUND
                 
                                                 if (antPhenotype[ant.id][2] === 1 && state.gameState.consumablesMap[ant.position[0]][ant.position[1] - distanceFromAnt] === 2) {
                 
                                                     // IF IT IS POISON AND THE ANT IDENTIFIES IT
                 
                                                     directionsLocked[0] = true
                 
                                                     // IF IT WAS GOING TOWARD IT
                 
                                                     if (ant.direction === 0) {
                 
                                                         // COULDN'T GO UP, TRY RIGHT
                 
                                                         if (ant.position[0] + 1 <= state.gameState.worldOptions.gridSize && state.gameState.consumablesMap[ant.position[0] + 1][ant.position[1]] != 2) {
                                                             direction = 2
                                                             decidedDirection = true
                                                         }
                 
                                                         // COULDN'T GO RIGHT, TRY DOWN
                 
                                                         else if (ant.position[1] + 1 <= state.gameState.worldOptions.gridSize && state.gameState.consumablesMap[ant.position[0]][ant.position[1] + 1] != 2) {
                                                             direction = 1
                                                             decidedDirection = true
                                                         }
                 
                                                         // COULDN'T GO DOWN, GO LEFT
                 
                                                         else {
                                                             direction = 3
                                                             decidedDirection = true
                                                         }
                                                     }
                                                 } else {
                                                     direction = 0
                                                     decidedDirection = true
                                                 }
                                             }
                                         }
                                     }
                 
                                     // FOUND CONSUMABLE (DOWN)
                 
                                     if (!directionsLocked[1]) {
                                         if (ant.position[1] + distanceFromAnt <= state.gameState.worldOptions.gridSize) {
                                             if (state.gameState.consumablesMap[ant.position[0]][ant.position[1] + distanceFromAnt] > 0) {
                                                 if (antPhenotype[ant.id][2] === 1 && state.gameState.consumablesMap[ant.position[0]][ant.position[1] + distanceFromAnt] === 2) {
                                                     directionsLocked[1] = true
                                                     if (ant.direction === 1) {
                                                         if (ant.position[0] - 1 >= 0 && state.gameState.consumablesMap[ant.position[0] - 1][ant.position[1]] != 2) {
                                                             // COULDN'T GO DOWN, GO LEFT
                                                             direction = 3
                                                             decidedDirection = true
                                                         } else if (ant.position[1] - 1 >= 0 && state.gameState.consumablesMap[ant.position[0]][ant.position[1] - 1] != 2) {
                                                             // COULDN'T GO LEFT, GO UP
                                                             direction = 0
                                                             decidedDirection = true
                                                         } else {
                                                             // COULDN'T GO UP, GO RIGHT
                                                             direction = 2
                                                             decidedDirection = true
                                                         }
                                                     }
                                                 } else {
                                                     direction = 1
                                                     decidedDirection = true
                                                 }
                                             }
                                         }
                                     }
                 
                                     // FOUND CONSUMABLE (RIGHT)
                                     if (!directionsLocked[2]) {
                                         if (ant.position[0] + distanceFromAnt <= state.gameState.worldOptions.gridSize) {
                                             if (state.gameState.consumablesMap[ant.position[0] + distanceFromAnt][ant.position[1]] > 0) {
                                                 if (antPhenotype[ant.id][2] === 1 && state.gameState.consumablesMap[ant.position[0] + distanceFromAnt][ant.position[1]] === 2) {
                                                     directionsLocked[2] = true
                                                     if (ant.direction === 2) {
                                                         if (ant.position[1] + 1 <= state.gameState.worldOptions.gridSize && state.gameState.consumablesMap[ant.position[0]][ant.position[1] + 1] != 2) {
                                                             // COULDN'T GO RIGHT, GO DOWN
                                                             direction = 1
                                                             decidedDirection = true
                                                         } else if (ant.position[0] - 1 >= 0 && state.gameState.consumablesMap[ant.position[0] - 1][ant.position[1]] != 2) {
                                                             // COULDN'T GO DOWN, GO LEFT
                                                             direction = 3
                                                             decidedDirection = true
                                                         } else {
                                                             // COULDN'T GO LEFT, GO UP
                                                             direction = 0
                                                             decidedDirection = true
                                                         }
                                                     }
                                                 } else {
                                                     direction = 2
                                                     decidedDirection = true
                                                 }
                                             }
                                         }
                                     }
                 
                                     // FOUND CONSUMABLE (LEFT)
                                     if (!directionsLocked[3]) {
                                         if (ant.position[0] - distanceFromAnt >= 0) {
                                             if (state.gameState.consumablesMap[ant.position[0] - distanceFromAnt][ant.position[1]] > 0) {
                                                 if (antPhenotype[ant.id][2] === 1 && state.gameState.consumablesMap[ant.position[0] - distanceFromAnt][ant.position[1]] === 2) {
                                                     directionsLocked[3] = true
                                                     if (ant.direction === 3) {
                                                         if (ant.position[1] - 1 >= 0 && state.gameState.consumablesMap[ant.position[0]][ant.position[1] - 1] != 2) {
                                                             // COULDN'T GO LEFT, GO UP
                                                             direction = 0
                                                             decidedDirection = true
                                                         } else if (ant.position[0] + 1 <= state.gameState.worldOptions.gridSize && state.gameState.consumablesMap[ant.position[0] + 1][ant.position[1]] != 2) {
                                                             // COULDN'T GO UP, GO RIGHT
                                                             direction = 2
                                                             decidedDirection = true
                                                         } else {
                                                             // COULDN'T GO RIGHT, GO DOWN
                                                             direction = 1
                                                             decidedDirection = true
                                                         }
                                                     }
                                                 } else {
                                                     direction = 3
                                                     decidedDirection = true
                                                 }
                                             }
                                         }
                                     }
                 
                 */