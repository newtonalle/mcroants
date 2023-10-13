<template>
  <div>
    <h2>Universal Values</h2>

    <p>Food Eaten: {{ universeStatus.foodEaten }}</p>
    <p>Poison Eaten: {{ universeStatus.poisonEaten }}</p>
    <p>Ant Deaths: {{ universeStatus.antDeaths }}</p>
    <p>Ant Kills: {{ universeStatus.antKills }}</p>
    <p>Breedings Occurred: {{ universeStatus.breedingsOccurred }}</p>
    <p>Food Points Shared: {{ universeStatus.foodPointsShared }}</p>
    <p>Fights Occurred: {{ universeStatus.fightsOccurred }}</p>
    <p>Ants Eaten: {{ universeStatus.antsEaten }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    universeStatus() {
      return this.$store.getters.getUniverseStatus;
    },
  },
};
</script>