<template>
  <div>
    <div>
      <p style="cursor: pointer" @click="active = !active">{{ label }}</p>
      <div v-if="active">
        <p>
          {{ geneDescription[geneName] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    geneName: String,
  },

  data: () => ({ active: false }),

  computed: {
    geneDescription() {
      return this.$store.getters.getGeneDescription;
    },
  },
};
</script>