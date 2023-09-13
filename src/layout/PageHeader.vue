<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark outlined-light">
      <div class="container-fluid">
        <img src="../../public/favicon.png" />
        <router-link
          style="margin-left: 10px"
          class="navbar-brand"
          :to="{ name: 'main' }"
          >MCROANTS (Version Beta 1.1)</router-link
        >

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link
              :class="['nav-link', $route.name === 'main' ? 'active' : '']"
              :to="{ name: 'main' }"
              >Main</router-link
            >
            <router-link
              :class="[
                'nav-link',
                $route.name === 'hallOfFame' ? 'active' : '',
              ]"
              :to="{ name: 'hallOfFame' }"
              >Hall Of Fame</router-link
            >
            <router-link
              :class="[
                'nav-link',
                $route.name === 'documentation' ? 'active' : '',
              ]"
              :to="{ name: 'documentation' }"
              >Documentation</router-link
            >
            <router-link
              :class="['nav-link', $route.name === 'updates' ? 'active' : '']"
              :to="{ name: 'updates' }"
              >Updates</router-link
            >
            <div class="dropdown">
              <br />
            </div>
            <button
              class="btn btn-outline-danger"
              style="margin-left: 10px"
              type="reset"
              @click="resetState"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </nav>
    <hr />
    <br />
  </div>
</template>

<script>
export default {
  methods: {
    resetState() {
      if (
        confirm(
          "Doing this will completly erase the current simulation, are you sure you want to continue?"
        )
      ) {
        this.$store.dispatch("resetState");
      }
    },
  },
};
</script>
