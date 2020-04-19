<template>
    <b-card
        title="Your Counter"
    >
        <b-row>
            <b-col>
                <b-button variant="primary" @click="current">Current</b-button>
            </b-col>
            <b-col>
                <b-button variant="primary" @click="next">Next</b-button>
            </b-col>
        </b-row>
        <b-card-text class="counter-status" v-if="this.currentValue && !this.loadingValue">
            {{ `Current value: ${currentValue}` }}
        </b-card-text>
        <b-card-text class="counter-status" v-if="this.loadingValue">
            Loading...
        </b-card-text>
    </b-card>
</template>

<script>
    export default {
      props: ['apiKey', 'initialValue'],
      data() {
        return {
          api: {
            endpoint: process.env.VUE_APP_API_URL,
            errors: []
          },
          currentValue: this.initialValue,
          loadingValue: false,
        }
      },
      methods: {
        buildConfig() {
          return {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
            }
          }
        },
        current() {
          this.loadingValue = true;
          this.$http.get(this.api.endpoint + '/v1/current', this.buildConfig())
            .then(({data: {result}}) => {
              this.currentValue = result;
              this.loadingValue = false;
            });
        },
        next() {
          this.loadingValue = true;
          this.$http.get(this.api.endpoint + '/v1/next', this.buildConfig())
            .then(({ data: { result }}) => {
              this.loadingValue = false;
              this.currentValue = result;
            });
        }
      },
    }
</script>

<style>
    .counter-status {
        padding-top: 1em;
    }
</style>
