<template>
  <div>
    <div @mouseenter="active = true" @mouseleave="active = false">
      <h5>{{ label }}</h5>
      <div v-if="active">
        <p>
          {{ configDescription[configName] }}
        </p>
      </div>
      <div v-else>
        <br />
        <br />
        <br />
      </div>
      <input
        style="width: 150px"
        type="number"
        v-model="value"
        placeholder="Insert Number"
      />
      <br />
      <br />
      <button
        style="width: 150px"
        class="btn btn-primary"
        @click="saveSettings()"
        :disabled="entryValue === Number(value)"
      >
        SAVE
      </button>
      <br />
      <br />
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    index: Number,
    entryValue: Number,
    configName: String,
  },

  data: () => ({ value: 0, active: false }),

  methods: {
    saveSettings() {
      this.$emit("saveSetting", this.value, this.index);
    },
  },

  computed: {
    configDescription() {
      return this.$store.getters.getConfigDescription;
    },
  },

  mounted() {
    this.value = this.entryValue;
  },
};
</script>