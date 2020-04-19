<template>
  <div id="app">
    <div class="logo">
      <img alt="Incrementific logo" src="./assets/plus.png" width="160">
    </div>
    <b-container class="center">
      <Login v-show="!this.userLoggedIn" @onLoggedIn="handleUserLoggedIn" />
      <Controls v-show="this.userLoggedIn" :apiKey="this.getApiKey" />
    </b-container>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Controls from './components/Controls.vue'

export default {
  name: 'App',
  components: {
    Login,
    Controls,
  },
  data() {
    return {
      api: {
        endpoint: process.env.VUE_APP_API_URL,
        errors: []
      },
      apiKey: null,
    }
  },
  computed: {
    userLoggedIn() {
     return !!this.apiKey;
    },
    getApiKey() {
      return this.apiKey;
    },
  },
  methods: {
    handleUserLoggedIn(data) {
      this.apiKey = data.apiKey;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .center {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }

  .logo {
    margin-bottom: 2em;
  }
</style>
