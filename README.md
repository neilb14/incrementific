# Incrementific
Serverless project to increment a counter

Code: [https://github.com/neilb14/incrementific](https://github.com/neilb14/incrementific)

## Notes
**Tech Stack:**
Serverless Framework, AWS lambdas (Node v12), API Gateway and Redis.
The front end is built with Vue and hosted on AWS Cloud Front.

Mostly this choice is driven by frugality and familiarity, but, the solution is production ready and highly scalable.

I chose to add Redis into the mix because it is free and quick to get set up but it handles concurrency very well. It even has a built in function to increment integers as an atomic operation. Essentially, this API is just a wrapper around Redis :-). If we were to use this in production, I'd create a Redis cluster sized to support the expected load and support high availability. I'd also persist changes to disk.

If this were to be used in production, I'd also have a user/identity service generating JWTs (eg. AWS Cognito). More on that in the shortcuts section below.

### Date
April 20, 2020

### Location of deployed application
Base path for API is: `https://8lldynes7j.execute-api.us-east-1.amazonaws.com/dev/`.

There is a Front End located here: [https://dsyedy089j021.cloudfront.net](https://dsyedy089j021.cloudfront.net).

The following endpoints are available for the API:

**/v1/register** (POST) - Registers for a new API Key. It expects JSON object containing `username` and `password` strings in the payload.
It returns a JSON object with a `message` and `apiKey` strings. The value of `apiKey` should be used as the Bearer token in subsequent requests.

Example Usage:
```bash
curl -X POST https://8lldynes7j.execute-api.us-east-1.amazonaws.com/dev/v1/register --data '{"username":"moose@mailinator.com", "password":"abc213"}'
```

**/v1/current** (GET) - Retrieves the current value of the counter. It returns a JSON object with a `message` string and `result` integer containing the current value of the counter. It expects the API key passed in as a the Bearer token in the headers.

Example Usage:
```bash
curl https://8lldynes7j.execute-api.us-east-1.amazonaws.com/dev/v1/current -H 'Authorization: Bearer eyJh....'
```

**/v1/next** (GET) - It increments the counter and returns a JSON object with a `message` string and `result` integer containing the incremented value. It expects the API key passed in as a the Bearer token in the headers.

Example Usage:
```bash
curl https://8lldynes7j.execute-api.us-east-1.amazonaws.com/dev/v1/next -H 'Authorization: Bearer eyJh....'
```

**/v1/set** (PUT) - Expects a string in the format `current=value` where value is any positive integer. It sets the current value of the counter and returns a JSON object with a `message` string and `result` integer. It expects the API key passed in as a the Bearer token in the headers.

Example Usage:
```bash
curl -X PUT https://8lldynes7j.execute-api.us-east-1.amazonaws.com/dev/v1/set -H 'Authorization: Bearer eyJh....' --data 'current=1000'
```


### Time spent
About 9 hours total. 5 on the backend and 4 on the frontend/Google Sign In.

### Assumptions made
- We need to support concurrent requests. Therefore using Redis to keep state and enforce consistency in read/set/increment actions.
- Counter begins at 0

### Shortcuts/Compromises made
The service currently doesn't validate the password when issuing new JWT.
I would prefer to use a user or identity service (such as AWS Cognito or Auth0) for this project so didn't spend much time on that part.
The user service would maintain the user record and issue JWTs. It would also validate the password before regenerating a JWT.
I've stubbed out a fake user service to demonstrate where this would happen.

Here are some other limitations of the current approach:
- API Key is a JWT token and will expire in 1 month. You can POST to the `/register` endpoint again to get another API Key.
- JWT is not signed with a private key. Before production use I would create a private key and sign/verify using it.

The front end needs a lot of work: styling, validation on inputs, and handling errors. It is functional but definitely not something I would put in front of users/customers.

Further, the Google Sign In button is pretty raw. This app would be rejected by Google because the button doesn't match Google's style guidelines.

### Stretch goals attempted
- I was able to build a rough UI. It needs some work but it is functional.
- I was able to incorporate OAuth with Google.
- I was able to deploy the app on AWS.

### Instructions to run assignment locally
See the backend [README.md](./backend/README.md) for a local dev environment and AWS deployment instructions. To run locally you can install the Serverless Offline plugin.

For the front end see [README.md](./frontend/README.md) for instructions on how to get the Vue project running.

### What did you not include in your solution that you want us to know about?
User management. If this were a production app, I would have a user identity provider to store a user's record and verify the password before issuing a new API token (JWT).

### Other information about your submission that you feel it's important that we know if applicable.

### Your feedback on this technical challenge
This was fun! Almost, too fun... I spent more time than I wanted, but I really did want to see the Google Sign In button working.

