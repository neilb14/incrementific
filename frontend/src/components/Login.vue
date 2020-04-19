<template>
  <div id='login-form-container'>
    <b-alert variant="danger" v-model="alerts.invalidCredentials">
      The email / password are incorrect
    </b-alert>
    <b-form @submit="onLoginSubmit">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <b-form-group
              id="email-input-group"
              label="Email Address:"
              label-for="email-input">
              <b-form-input
                id="email-input"
                type="email"
                required
                autocomplete="username"
                :state="fieldState.login"
                v-model="form.email">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              id="password-input-group"
              label="Password:"
              label-for="password-input">
              <b-form-input
                id="password-input"
                type="password"
                required
                autocomplete="current-password"
                :state="fieldState.login"
                v-model="form.password">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-button id="login-form-submit-btn" class="login-form-btn" variant="primary" type="submit">Login</b-button>
    </b-form>
    <b-container class="providerSpacer">
      - OR -
    </b-container>
    <b-container class="googleSignIn">
      <g-signin-button
              :params="googleSignInParams"
              @success="onGoogleSignInSuccess"
              @error="onGoogleSignInError">
        Sign in with Google
      </g-signin-button>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      api: {
        endpoint: process.env.VUE_APP_API_URL,
        errors: []
      },
      googleSignInParams: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      alerts: {
        invalidCredentials: false
      },
      fieldState: {
        login: null
      },
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    clearFields () {
      this.form.email = ''
      this.form.password = ''
    },
    clearAlerts () {
      this.alerts.invalidCredentials = false
      this.fieldState.login = null
    },
    onLoginSubmit (evt) {
      evt.preventDefault()
      this.clearAlerts()
      let requestData = {
        username: this.form.email,
        password: this.form.password
      }
      this.$http.post(this.api.endpoint + '/v1/register', requestData)
      .then((response) => {
        this.clearFields()
        this.clearAlerts()
        this.$emit('onLoggedIn', response.data)
      })
      .catch(e => {
        this.alerts.invalidCredentials = true
        this.fieldState.login = false
        this.api.errors.push(e)
      })
    },
    onGoogleSignInSuccess (googleUser) {
      const authResponse = googleUser.getAuthResponse(true);
      this.clearAlerts()
      this.$emit('onLoggedIn', {
        apiKey: authResponse.id_token,
      })
    },
    onGoogleSignInError (error) {
      this.alerts.invalidCredentials = true
      console.log('Error while logging in with Google:', error)
    }
  }
}
</script>

<style scoped>
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
  .providerSpacer {
    padding: 2em;
  }
</style>
