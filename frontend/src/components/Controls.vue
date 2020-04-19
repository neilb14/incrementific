<template>
    <b-card
        title="Your Counter"
    >
        <b-card-text class="counter-status" v-if="this.showCurrentValue">
            {{ `Current value: ${currentValue}` }}
        </b-card-text>
        <b-card-text class="counter-status" v-if="this.loadingValue">
            Loading...
        </b-card-text>
        <b-row>
            <b-col>
                <b-button variant="primary" @click="current">Current</b-button>
            </b-col>
            <b-col>
                <b-button variant="primary" @click="next">Next</b-button>
            </b-col>
        </b-row>
        <b-container class="setControl">
            <input v-model="setValue" placeholder="new value" />
            <b-button variant="primary" @click="set">Set</b-button>
        </b-container>
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
          setValue: null,
        }
      },
      computed: {
        showCurrentValue() {
            if (this.loadingValue) return false;
            return !isNaN(this.currentValue);
        },
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
        },
        set() {
          this.loadingValue = true;
          this.$http.put(
            this.api.endpoint + '/v1/set',
            `current=${this.setValue}`,
            this.buildConfig()
          ).then(({ data: { result }}) => {
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
    .setControl {
        padding-top: 1em;
    }
    .setControl input {
        width: 100px;
        margin-right: 0.3em;
    }
</style>
