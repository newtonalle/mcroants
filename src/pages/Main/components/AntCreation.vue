<template>
  <div>
    <h4>Create Ant</h4>
    <br />
    <div class="dropdown">
      <button
        class="btn btn-warning dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Type
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <button
            :class="[
              'dropdown-item',
              antData.type === 'redAnts' ? 'active' : '',
            ]"
            @click="antData.type = 'redAnts'"
          >
            Red Ant
          </button>
        </li>
        <li>
          <button
            :class="[
              'dropdown-item',
              antData.type === 'blackAnts' ? 'active' : '',
            ]"
            @click="antData.type = 'blackAnts'"
          >
            Black Ant
          </button>
        </li>
      </ul>
    </div>
    <br />
    <h5>Starting Food Level</h5>
    <input
      type="number"
      v-model="antData.foodLevel"
      placeholder="Insert Number"
    />
    <br />
    <br />
    <h5>Cromossomes</h5>
    <p>
      Click name for descriptions! (And visit the documentation for more
      specific info)
    </p>
    <br />
    <gene-description-model geneName="vision" label="Vision (0 - 15)" />
    <input
      type="number"
      v-model="antData.cromossomes[0][0]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][0]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model
      geneName="exploration"
      label="Exploration (0 - 3)"
    />
    <input
      type="number"
      v-model="antData.cromossomes[0][1]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][1]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model
      geneName="poisonIdentification"
      label="Poison Identification (0 - 1)"
    />
    <input
      type="number"
      v-model="antData.cromossomes[0][2]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][2]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model
      geneName="foodForMating"
      label="Food for Mating (0 - 1)"
    />
    <input
      type="number"
      v-model="antData.cromossomes[0][3]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][3]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model geneName="sharing" label="Sharing (0 - 3)" />
    <input
      type="number"
      v-model="antData.cromossomes[0][4]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][4]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model geneName="antVision" label="Ant Vision (0 - 1)" />
    <input
      type="number"
      v-model="antData.cromossomes[0][5]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][5]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model
      geneName="anteaterVision"
      label="Anteater Vision (0 - 1)"
    />
    <input
      type="number"
      v-model="antData.cromossomes[0][6]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][6]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model geneName="agression" label="Agression (0 - 3)" />
    <input
      type="number"
      v-model="antData.cromossomes[0][7]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][7]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <gene-description-model geneName="strength" label="Strength (0 - 2)" />
    <input
      type="number"
      v-model="antData.cromossomes[0][8]"
      placeholder="Cromossome I"
    />
    <input
      type="number"
      v-model="antData.cromossomes[1][8]"
      placeholder="Cromossome II"
      style="margin-left: 20px"
    />
    <br />
    <br />
    <h5>Kills</h5>
    <input type="number" v-model="antData.kills" placeholder="Insert Number" />
    <br />
    <br />
    <button @click="createAnt" class="btn btn-success">Create</button>
  </div>
</template>

<script>
import GeneDescriptionModel from "./GeneDescriptionModel.vue";
export default {
  data: () => ({
    antData: {
      type: "blackAnts",
      position: [0, 0],
      foodLevel: 200,
      cromossomes: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      kills: 0,
    },
  }),

  components: {
    GeneDescriptionModel,
  },

  props: { worldOptions: Object },
  methods: {
    createAnt() {
      this.antData.cromossomes.forEach((cromossome, indexA) => {
        cromossome.forEach((gene, indexB) => {
          this.antData.cromossomes[indexA][indexB] = Number(gene);
        });
      });

      this.$store.dispatch("createAnt", this.antData);
    },
  },
};
</script>