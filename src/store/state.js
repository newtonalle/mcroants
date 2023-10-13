export default () => ({
    gameState: {
        worldOptions: {

            // NOTE THAT NUMBERS TOO HIGH MIGHT CRASH/SLOW DOWN THE APP

            consumables: {

                // ID "0" is reserved for empty tiles

                foods: {
                    startingNumber: 0,
                    maxNumber: 20,
                    color: '#FFFF00', // RECOMENDED: #964B00 or #FFFF00
                    id: 1
                },

                poisons: {
                    startingNumber: 0,
                    maxNumber: 0,
                    color: '#32CD32', // RECOMENDED: #32CD32
                    id: 2
                },
            },

            ants: {
                blackAnts: {
                    startingNumber: 2, // RECOMENDED 10 - 30
                    color: '#FFFFFF', // RECOMENDED: #000000 or #FFFFFF
                    trackedColor: '#89f0a4', // RECOMENDED: #89f0a4
                },

                redAnts: {
                    startingNumber: 2, // RECOMENDED 10 - 30
                    color: '#FF0000', // RECOMENDED: #FF0000
                    trackedColor: '#fa7f7f', // RECOMENDED: #fa7f7f
                },
            },


            antEaters: {
                startingNumber: 2, // RECOMENDED 0 - 2
                color: '#7d0bbf', // RECOMENDED: #7d0bbf
            },

            consumablesPerCycle: 1,
            gridSize: 25, // RECOMENDED: 300 - 500
            foodValue: 10, // RECOMENDED 10+
            pixelProportion: 10, // RECOMENDED: 2 - 5
            poisonFoodChance: 0,  // X in 1000, HIGH VALUES MIGHT KILL OF ALL THE ANTS
            antStartingFoodLevel: 1000, // RECOMENDED: 200+, SETTING THIS VALUE HIGHER THAN THE MATING COST WILL RESULT IN INFINITE ANTS
            babyAntStartingFoodLevel: 200, // RECOMENDED: 50+
            crossoverRate: 1, // x in 100 matings, HIGH VALUES CAUSE THE ANTS TO BE TOO RANDOM
            alleleMutationChance: 100, // X in 10000, HIGH VALUES CAUSE THE ANTS TO BE TOO RANDOM
            backgroundColor: '#000000', // RECOMENDED: #FFFFFF or #000000

            advancedOptions: {
                minimumCombatPointDifference: 100,
                poisonDisappear: false,
                matingCost: 500,
            }
        },

        universeStatus: {
            foodEaten: 0,

            poisonEaten: 0,

            antDeaths: 0,

            antKills: 0,

            breedingsOccurred: 0,

            foodPointsShared: 0,

            fightsOccurred: 0,

            antsEaten: 0,
        },

        baseWorldGrid: [],

        redAnts: [],

        blackAnts: [],

        ants: [],

        consumablesMap: [],

        antMap: [],

        antEaterMap: [],

        emptyTiles: [],

        antPairs: [],

        antEaters: [],

        currentHighestAntID: 0,

        currentCycle: 0,

        simulationStarted: false
    },
})

