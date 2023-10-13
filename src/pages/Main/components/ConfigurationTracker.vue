<template>
  <div>
    <h2>World Options</h2>

    <p>Max Nº of Food: {{ worldOptions.consumables.foods.maxNumber }}</p>
    <p>Max N° of Poison: {{ worldOptions.consumables.poisons.maxNumber }}</p>
    <p>Consumable/cycle: {{ worldOptions.consumablesPerCycle }}</p>
    <p>Food Level/Food: {{ worldOptions.foodValue }}</p>
    <p>
      Grid: {{ worldOptions.gridSize }}x{{ worldOptions.gridSize }} (with pixel
      proportion of {{ worldOptions.pixelProportion }})
    </p>
    <p>Poison Food Chance: {{ worldOptions.poisonFoodChance / 10 }}%</p>
    <p>
      Baby Ant Starting Food Level:
      {{ worldOptions.babyAntStartingFoodLevel }}
    </p>
    <p>Crossover Rate: {{ worldOptions.crossoverRate }}%</p>
    <p>
      Allele Mutation Chance:
      {{ worldOptions.alleleMutationChance / 100 }}%
    </p>
    <h2>Advanced Options</h2>
    <p>
      Poison Disappear after Consumption:
      {{ worldOptions.advancedOptions.poisonDisappear }}
    </p>

    <p>
      Minimum Combat Point Difference:
      {{ worldOptions.advancedOptions.minimumCombatPointDifference }}
    </p>

    <p>Mating Cost: {{ worldOptions.advancedOptions.matingCost }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    worldOptions() {
      return this.$store.getters.getWorldOptions;
    },
  },
};
</script>