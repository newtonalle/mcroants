<template>
  <div>
    <div class="row">
      <div class="col-2">
        <img
          src="../../../public\favicon.png"
          alt="ANT"
          height="100px"
          width="100px"
          style="
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
          "
        />
      </div>
      <div class="col-8">
        <h1>Introductions</h1>

        <br />

        <p>
          Mcroants is a simulator that has as a main objective to teach and
          prove to its users about how the studies of Genetics work, this is
          done via a simulation, completly controlable by the user, that
          simulates an ecosystem formed of ants, consumables & ant eaters
        </p>
        <p>
          If this is your first time accessing Mcroants, please consider reading
          the DOCUMENTATION page
        </p>

        <br />
      </div>
      <div class="col-2">
        <img
          src="../../../public\favicon.png"
          alt="ANT"
          height="100px"
          width="100px"
          style="
            -webkit-transform: rotate(315deg);
            -moz-transform: rotate(315deg);
            -ms-transform: rotate(315deg);
            -o-transform: rotate(315deg);
            transform: rotate(315deg);
          "
        />
      </div>
      <hr />
      <br />
    </div>

    <h1>Simulation</h1>

    <div class="row">
      <div class="col-12" v-if="!simulationStarted">
        <!-- PRE-SIMULATION MENU -->

        <ant-creation />

        <br />
        <hr />
        <br />

        <worldOptions />

        <br />
      </div>

      <!-- CONFIGURATION TRACKER -->

      <div v-if="simulationStarted" class="row">
        <div class="col-6">
          <configuration-tracker />
        </div>
        <div class="col-6">
          <universe-status-tracker />
        </div>
      </div>

      <hr />

      <!-- CANVAS AND RUNNING ACTIONS -->

      <div v-if="simulationStarted">
        <simulation-canvas />
      </div>
    </div>
    <br />

    <!-- ANT TRACKER -->

    <h1>Current Ants</h1>

    <div class="row">
      <div
        class="col-6"
        v-for="(ant, index) in globalAnts"
        :key="`id-${ant.id}-index-${index}`"
      >
        <ant-status :ant="ant" />
        <hr />
      </div>
    </div>

    <p v-if="globalAnts.length === 0">No ants available!</p>

    <br />
    <br />
    <br />

    <p v-if="antsExported">{{ globalAnts }}</p>
    <button
      :disabled="globalAnts.length === 0"
      style="width: 85%"
      class="btn btn-success"
      @click="antsExported = !antsExported"
    >
      Export All Ants
    </button>

    <br />
    <br />
  </div>
</template>

<script>
import SimulationCanvas from "./components/SimulationCanvas.vue";
import ConfigurationTracker from "./components/ConfigurationTracker.vue";
import UniverseStatusTracker from "./components/UniverseStatusTracker.vue";
import AntCreation from "./components/AntCreation.vue";
import AntStatus from "./components/AntStatus.vue";
import WorldOptions from "./components/WorldOptions.vue";

export default {
  components: {
    SimulationCanvas,
    AntStatus,
    AntCreation,
    ConfigurationTracker,
    UniverseStatusTracker,
    WorldOptions,
  },

  data: () => ({
    antsExported: false,
  }),

  computed: {
    simulationStarted() {
      return this.$store.getters.getSimulationStarted;
    },

    globalAnts() {
      return this.$store.getters.getGlobalAnts;
    },
  },
};
</script>