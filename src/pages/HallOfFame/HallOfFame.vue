<template>
  <div class="row">
    <div class="col-4" />
    <div class="col-4">
      <h1>Hall Of Fame</h1>

      <p>
        This is a list that shows the ants with the best performance in each
        category:
      </p>

      <hr />

      <h2>Most Food Levels (at once)</h2>
      <ul>
        <li
          v-for="(ant, index) in antsOrderByHighestFoodLevel"
          :key="`antsOrderedByHFLIndex-${index}-AntId-${ant.id}`"
        >
          ID #{{ ant.id }} - {{ ant.highestFoodLevel }}
        </li>
      </ul>
      <p v-if="antsOrderByHighestFoodLevel.length === 0">
        No ants in the simulation!
      </p>

      <h2>Longest Life</h2>
      <ul>
        <li
          v-for="(ant, index) in antsOrderByAge"
          :key="`antsOrderedByAIndex-${index}-AntId-${ant.id}`"
        >
          ID #{{ ant.id }} - {{ ant.age }}
        </li>
      </ul>
      <p v-if="antsOrderByHighestFoodLevel.length === 0">
        No ants in the simulation!
      </p>

      <h2>Most Breedings</h2>
      <ul>
        <li
          v-for="(ant, index) in antsOrderByBreedings"
          :key="`antsOrderedByBIndex-${index}-AntId-${ant.id}`"
        >
          ID #{{ ant.id }} - {{ ant.breedings }}
        </li>
      </ul>
      <p v-if="antsOrderByHighestFoodLevel.length === 0">
        No ants in the simulation!
      </p>

      <h2>Most Kills</h2>
      <ul>
        <li
          v-for="(ant, index) in antsOrderByKills"
          :key="`antsOrderedByKIndex-${index}-AntId-${ant.id}`"
        >
          ID #{{ ant.id }} - {{ ant.kills }}
        </li>
      </ul>
      <p v-if="antsOrderByHighestFoodLevel.length === 0">
        No ants in the simulation!
      </p>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    globalAnts() {
      return this.$store.getters.getGlobalAnts;
    },

    antsOrderByHighestFoodLevel() {
      let orderedAnts = this.$store.getters.getGlobalAnts;

      orderedAnts.sort(function (antA, antB) {
        return antB.highestFoodLevel - antA.highestFoodLevel;
      });

      return orderedAnts;
    },

    antsOrderByAge() {
      let orderedAnts = this.$store.getters.getGlobalAnts;

      orderedAnts.sort(function (antA, antB) {
        return antB.age - antA.age;
      });

      return orderedAnts;
    },

    antsOrderByBreedings() {
      let orderedAnts = this.$store.getters.getGlobalAnts;

      orderedAnts.sort(function (antA, antB) {
        return antB.breedings - antA.breedings;
      });

      return orderedAnts;
    },

    antsOrderByKills() {
      let orderedAnts = this.$store.getters.getGlobalAnts;

      orderedAnts.sort(function (antA, antB) {
        return antB.kills - antA.kills;
      });

      return orderedAnts;
    },
  },
};
</script>