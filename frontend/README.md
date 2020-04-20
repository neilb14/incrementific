# Incrementific Vue Front End

## Before you start
If you want the Sign In with Google button to work you will need to configure your own OAuth client.
Visit [https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials)
to create a new Oauth 2.0 Client and make note of the generated client ID.

## Project setup
```
yarn install
```

And then create a .env.local file to define environment variables.

You will need to set the following environment variables:
- `VUE_APP_API_URL` will be the url of your API
- `VUE_APP_GOOGLE_CLIENT_ID` will be the Google OAuth client ID available in your Google console

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Deploy the service
Create a .env file and set your AWS credentials. 

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Then run serverless deploy:
```bash
serverless deploy
```

It will publish the website to AWS cloud front and tell you the URL.
