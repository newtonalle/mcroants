<template>
  <div>
    <p v-if="ant.tracked">TRACKED</p>
    <div style="cursor: pointer" @click="active = !active">
      <h4>ANT #{{ ant.id }}</h4>
      <h5>{{ antTypeLabel[ant.type] }}</h5>
    </div>
    <div v-if="active">
      <p>X ({{ ant.position[0] }}); Y ({{ ant.position[1] }})</p>
      <p>PHENOTYPE {{ antPhenotype[ant.id] }}</p>
      <p>CROMOSSOMES {{ ant.cromossomes }}</p>
      <p>FOOD LEVEL ({{ ant.foodLevel }})</p>
      <p>AGE ({{ ant.age }}, GENERATION {{ ant.generation }})</p>
      <p>BORN IN {{ ant.birthCycle }}</p>
      <p v-if="ant.alive">ALIVE</p>
      <div v-else>
        <p>DEAD, DIED IN {{ ant.deathCycle }}</p>
        <p>CAUSE OF DEATH ({{ ant.deathType }})</p>
      </div>
      <p v-if="ant.firstParentId > -1 && ant.secondParentId > -1">
        PARENTS (ANT #{{ ant.firstParentId }} & ANT #{{ ant.secondParentId }})
      </p>
      <p v-if="ant.firstParentId === -1 || ant.secondParentId === -1">
        FOUNDER ANT
      </p>
      <p v-if="ant.firstParentId === -2 || ant.secondParentId === -2">
        ADDED ANT
      </p>
      <p>KILLS {{ ant.kills }}</p>
      <p>BREEDINGS {{ ant.breedings }}</p>
      <p>HIGHEST FOOD LEVEL {{ ant.highestFoodLevel }}</p>
      <button :class="buttonTrackColor[ant.tracked]" @click="trackAnt">
        {{ buttonTrackText[ant.tracked] }}
      </button>
      <br />
      <br />
      <button class="btn btn-success" @click="antExport = !antExport">
        Export Ant
      </button>
      <br />
      <br />
      <p v-if="antExport">{{ ant }}</p>
    </div>
    <div v-else>
      <div style="margin-bottom: 25px">
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    antPhenotype() {
      return this.$store.getters.getAntPhenotype;
    },

    buttonTrackText() {
      return {
        true: "UNTRACK ANT",
        false: "TRACK ANT",
      };
    },

    buttonTrackColor() {
      return {
        true: "btn btn-danger",
        false: "btn btn-warning",
      };
    },

    antTypeLabel() {
      return {
        blackAnts: "Black Ant",
        redAnts: "Red Ant",
      };
    },
  },
  methods: {
    async trackAnt() {
      await this.$store.dispatch("trackAnt", this.ant.id);
    },
  },

  data: () => ({
    active: false,
    antExport: false,
  }),

  props: { ant: Object },
};
</script>