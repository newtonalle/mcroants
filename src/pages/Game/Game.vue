<template>
  <div>
    <br />
    <h1>MCROANTS</h1>
    <p>Version Beta 1.0</p>
    <br />
    <hr />
    <div class="row">
      <div class="col-12" v-if="!simulationStarted">
        <!-- MAIN CONFIG MENU -->

        <h1>World Options</h1>
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
        <div>
          <!-- CONFIRMATION BUTTONS -->
          <br />
          <br />
          <button
            :disabled="simulationStarted"
            @click="startSimulation"
            style="width: 200px"
            class="btn btn-success"
          >
            Setup
          </button>
          <br />
          <br />
        </div>
      </div>

      <!-- CONFIGURATION TRACKER -->

      <div v-if="simulationStarted" class="col-12">
        <h1>World Options</h1>

        <p>Max Nº of Food: {{ worldOptions.consumables.foods.maxNumber }}</p>
        <p>
          Max N° of Poison: {{ worldOptions.consumables.poisons.maxNumber }}
        </p>
        <p>Consumable/cycle: {{ worldOptions.consumablesPerCycle }}</p>
        <p>Food Level/Food: {{ worldOptions.foodValue }}</p>
        <p>
          Grid: {{ worldOptions.gridSize }}x{{ worldOptions.gridSize }} (with
          pixel proportion of {{ worldOptions.pixelProportion }})
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
      <hr />
      <div>
        <!-- COUNTERS AND SIMULTATING OPTIONS -->

        <div v-if="simulationStarted">
          <h1>CYCLE #{{ currentCycle }}</h1>
          <br />
          <br />
          <button
            :disabled="!simulationStarted"
            @click="cycleStep"
            class="btn btn-primary"
          >
            Cycle Step
          </button>
          <button
            :disabled="!simulationStarted"
            @click="autoCycle"
            style="width: 50px; margin-left: 10px"
            class="btn btn-outline-warning"
          >
            ⚙️
          </button>
          <br />
          <br />

          <!-- WORLD CANVAS -->

          <canvas
            id="myCanvas"
            :width="worldOptions.gridSize * worldOptions.pixelProportion"
            :height="worldOptions.gridSize * worldOptions.pixelProportion"
          />
          <br />
          <br />
          <button @click="resetState" class="btn btn-danger">Reset</button>
          <br />
          <br />
        </div>
      </div>
    </div>
    <div class="row">
      <!-- ANT TRACKER -->

      <div class="col-6">
        <div v-if="blackAnts.length != 0">
          <div class="row">
            <h1>Black Ants</h1>
            <div
              class="col-3"
              v-for="(ant, index) in blackAnts"
              :key="`id-${ant.id}-index-${index}`"
            >
              <ant-status :ant="ant" />
            </div>
          </div>
        </div>
      </div>

      <!-- ANT TRACKER -->

      <div class="col-6">
        <div v-if="redAnts.length != 0">
          <div class="row">
            <h1>Red Ants</h1>
            <div
              class="col-3"
              v-for="(ant, index) in redAnts"
              :key="`id-${ant.id}-index-${index}`"
            >
              <ant-status :ant="ant" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AntStatus from "./components/AntStatus.vue";
import InputModel from "./components/InputModel.vue";

export default {
  components: { AntStatus, InputModel },

  data: () => ({
    setIntervalId: -1,
    autoCycleActive: false,
    autoCycleSpeed: 50, // Interval in milliseconds
    selectedAnts: {
      blackAnts: [0, 0],
      redAnts: [0, 0],
    },

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
      { value: 1, name: " crossoverRate", label: "Crossover Rate (in 100)" },
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
    ],
  }),

  methods: {
    updateCanvas() {
      var canvas = document.getElementById("myCanvas");

      if (!canvas) {
        return;
      }

      var ctx = canvas.getContext("2d");

      // Draw Background

      ctx.fillStyle = this.worldOptions.backgroundColor;
      ctx.fillRect(
        0,
        0,
        this.worldOptions.gridSize * this.worldOptions.pixelProportion,
        this.worldOptions.gridSize * this.worldOptions.pixelProportion
      );

      // Draw Ants

      Object.keys(this.worldOptions.ants).forEach((antType) => {
        ctx.fillStyle = this.worldOptions.ants[antType].color;
        this[antType].forEach((ant) => {
          if (ant.alive) {
            ctx.fillRect(
              ant.position[0] * this.worldOptions.pixelProportion,
              ant.position[1] * this.worldOptions.pixelProportion,
              this.worldOptions.pixelProportion,
              this.worldOptions.pixelProportion
            );
          }
        });
      });

      // Draw Consumables

      Object.keys(this.worldOptions.consumables).forEach((consumableType) => {
        ctx.fillStyle = this.worldOptions.consumables[consumableType].color;
        this[consumableType].forEach((consumable) => {
          ctx.fillRect(
            consumable[0] * this.worldOptions.pixelProportion,
            consumable[1] * this.worldOptions.pixelProportion,
            this.worldOptions.pixelProportion,
            this.worldOptions.pixelProportion
          );
        });
      });
    },

    saveSetting(value, index) {
      console.log(this.configs[index].value, Number(value));
      this.configs[index].value = Number(value);
      console.log(this.configs[index].value, Number(value));
      this.configs.push();
    },

    async resetState() {
      await this.$store.dispatch("resetState");
      clearInterval(this.setIntervalId);
      this.updateCanvas();
    },

    async cycleStep() {
      await this.$store.dispatch("cycleStep");
      this.updateCanvas();
    },

    async startSimulation() {
      await this.$store.dispatch("applyConfig", this.configs);
      await this.$store.dispatch("environmentSetup");
      this.updateCanvas();
    },

    async autoCycle() {
      if (this.autoCycleActive) {
        this.autoCycleActive = false;
        clearInterval(this.setIntervalId);
      } else {
        this.autoCycleActive = true;
        this.setIntervalId = setInterval(async () => {
          await this.cycleStep();
        }, this.autoCycleSpeed);
      }
    },
  },

  computed: {
    simulationStarted() {
      return this.$store.getters.getSimulationStarted;
    },

    blackAnts() {
      return this.$store.getters.getBlackAnts;
    },

    redAnts() {
      return this.$store.getters.getRedAnts;
    },

    foods() {
      return this.$store.getters.getFoods;
    },

    poisons() {
      return this.$store.getters.getPoisons;
    },

    antEaters() {
      return this.$store.getters.getAntEaters;
    },

    worldOptions() {
      return this.$store.getters.getWorldOptions;
    },

    currentCycle() {
      return this.$store.getters.getCurrentCycle;
    },

    antPhenotype() {
      return this.$store.getters.getAntPhenotype;
    },
  },

  mounted() {
    this.updateCanvas();
  },
};
</script>