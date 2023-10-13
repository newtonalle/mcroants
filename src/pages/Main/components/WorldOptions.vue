<template>
  <div>
    <h2>World Options</h2>

    <br />

    <div class="row">
      <div
        class="col-4"
        v-for="(config, index) in configs"
        :key="`index-${index}-label-${config.name}`"
      >
        <input-model
          :index="index"
          :label="config.label"
          :entryValue="config.value"
          :configName="config.name"
          @saveSetting="saveSetting"
        />
      </div>
    </div>

    <br />

    <button
      :disabled="simulationStarted"
      @click="startSimulation"
      style="width: 200px"
      class="btn btn-success"
    >
      DEFINE CONFIGURATIONS
    </button>
  </div>
</template>

<script>
import InputModel from "./InputModel.vue";
export default {
  components: {
    InputModel,
  },

  data: () => ({
    configs: [
      { value: 0, name: "foodStartingNumber", label: "Food Starting Number" },
      { value: 20, name: "foodMaxNumber", label: "Food Max Number" },
      {
        value: 0,
        name: "poisonStartingNumber",
        label: "Poison Starting Number",
      },
      { value: 0, name: "poisonMaxNumber", label: "Poison Max Number" },
      {
        value: 2,
        name: "blackAntsStartingNumber",
        label: "Black Ants Starting Number",
      },
      {
        value: 2,
        name: "redAntsStartingNumber",
        label: "Red Ants Starting Number",
      },
      { value: 1, name: "consumablesPerCycle", label: "Consumables Per Cycle" },
      { value: 25, name: "gridSize", label: "Grid Size" },
      { value: 10, name: "foodValue", label: "Food Value" },
      { value: 10, name: "pixelProportion", label: "Pixel Proportion" },
      {
        value: 0,
        name: "poisonFoodChance",
        label: "Poison Food Chance (in 1000)",
      },
      {
        value: 1000,
        name: "antStartingFoodLevel",
        label: "Ant Starting Food Level",
      },
      {
        value: 200,
        name: "babyAntStartingFoodLevel",
        label: "Baby Ant Starting Food Level",
      },
      { value: 1, name: "crossoverRate", label: "Crossover Rate (in 100)" },
      {
        value: 100,
        name: "alleleMutationChance",
        label: "Allele Mutation Chance (in 10000)",
      },
      {
        value: 100,
        name: "minimumCombatPointDifference",
        label: "Minimum Combat Point Difference",
      },
      {
        value: 0,
        name: "poisonDisappear",
        label: "Poison Disappear (0 is false, 1 is true)",
      },
      { value: 500, name: "matingCost", label: "Mating Cost" },
      {
        value: 1,
        name: "antEatersStartingNumber",
        label: "Ant Eaters Starting Number",
      },
    ],
  }),

  methods: {
    saveSetting(value, index) {
      this.configs[index].value = Number(value);
      this.configs.push();
    },

    async startSimulation() {
      await this.$store.dispatch("applyConfig", this.configs);
      await this.$store.dispatch("environmentSetup");
    },
  },

  computed: {
    worldOptions() {
      return this.$store.getters.getWorldOptions;
    },
  },
};
</script>