# Incrementific Vue Front End

## Project setup
```
yarn install
```

And then create a .env.local file to define environment variables.
You will need to set the `VUE_APP_API_URL` to the url of your API.

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
