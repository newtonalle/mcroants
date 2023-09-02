<template>
  <div @click="active = !active" style="cursor: pointer">
    <h4>ANT #{{ ant.id }}</h4>
    <div v-if="active">
      <p>X ({{ ant.position[0] }}); Y ({{ ant.position[1] }})</p>
      <p>PHENOTYPE {{ antPhenotype[ant.id] }}</p>
      <p>CROMOSSOMES {{ ant.cromossomes }}</p>
      <p>FOOD LEVEL ({{ ant.foodLevel }})</p>
      <p>AGE ({{ ant.age }}, GENERATION {{ ant.generation }})</p>
      <p>BORN IN {{ ant.birthCycle }}</p>
      <p v-if="ant.alive">ALIVE</p>
      <p v-else>DEAD, DIED IN {{ ant.deathCycle }}</p>
      <p v-if="ant.firstParentId != -1 && ant.secondParentId != -1">
        PARENTS (ANT #{{ ant.firstParentId }} & ANT #{{ ant.secondParentId }})
      </p>
      <p v-else>FOUNDER ANT</p>
      <p>KILLS {{ ant.kills }}</p>
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
  },

  data: () => ({
    active: false,
  }),

  props: { ant: Object },
};
</script>