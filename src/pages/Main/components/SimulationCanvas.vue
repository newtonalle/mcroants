<template>
  <div>
    <!-- COUNTERS AND SIMULATTING OPTIONS -->

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
        class="btn btn-outline-primary"
      >
        ▶️
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

      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    setIntervalId: -1,
    autoCycleActive: false,
    autoCycleSpeed: 50, // Interval in milliseconds
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

      this.globalAnts.forEach((ant) => {
        if (ant.tracked) {
          ctx.fillStyle = this.worldOptions.ants[ant.type].trackedColor;
        } else {
          ctx.fillStyle = this.worldOptions.ants[ant.type].color;
        }
        if (ant.alive) {
          ctx.fillRect(
            ant.position[0] * this.worldOptions.pixelProportion,
            ant.position[1] * this.worldOptions.pixelProportion,
            this.worldOptions.pixelProportion,
            this.worldOptions.pixelProportion
          );
        }
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

      // Draw Ant Eaters

      this.antEaters.forEach((antEater) => {
        ctx.fillStyle = this.worldOptions.antEaters.color;
        ctx.fillRect(
          antEater.position[0] * this.worldOptions.pixelProportion,
          antEater.position[1] * this.worldOptions.pixelProportion,
          this.worldOptions.pixelProportion,
          this.worldOptions.pixelProportion
        );
      });
    },

    async cycleStep() {
      await this.$store.dispatch("cycleStep");
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

    globalAnts() {
      return this.$store.getters.getGlobalAnts;
    },
  },

  mounted() {
    this.updateCanvas();
  },
};
</script>