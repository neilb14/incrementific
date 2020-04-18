# incrementific
Serverless project to increment a counter

## Notes
**Tech Stack:** Serverless Framework, AWS lambdas (Node v12), API Gateway and Redis.

Mostly this choice is driven by frugality and familiarity, but, the solution is production ready and highly scalable.

I chose to add Redis into the mix because it is free and quick to get set up but it handles concurrency very well. It even has a built in function to increment integers as an atomic operation. Essentially, this API is just a wrapper around Redis :-). If we were to use this in production, I'd create a Redis cluster sized to support the expected load and support high availability. I'd also persist changes to disk.

If this were to be used in production, I'd also have a user/identity service generating JWTs (eg. AWS Cognito). More on that in the shortcuts section below.

### Date
The date you're submitting this.

### Location of deployed application
Base path is: `https://8lldynes7j.execute-api.us-east-1.amazonaws.com/dev/`

The following endpoints are available:

**/register** (POST) - expects JSON object containing `username` and `password` strings in the payload.
It returns a JSON object with a `message` and `apiKey` strings. The value of `apiKey` should be used as the Bearer token in subsequent requests.

### Time spent
How much time did you spend on the assignment? Normally, this is expressed in hours.

### Assumptions made
- We need to support concurrent requests. Therefore using Redis to keep state and enforce consistency in read/set/increment actions.
- Counter begins at 0

### Shortcuts/Compromises made
I would prefer to use a user or identity service (such as AWS Cognito or Auth0) for this project so didn't spend much time on that part.
The user service would maintain the user record and issue JWTs. It would also validate the password before regenerating a JWT. The service currently doesn't validate the password when issuing new JWT.

Here are some other limitations of the current approach:
- API Key is a JWT token and will expire in 1 month. You can POST to the `/register` endpoint again to get another API Key.
- JWT is not signed with a private key so could be spoofed. Before production use we will create a private key and sign/verify using it.

### Stretch goals attempted
If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you
could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.

### Instructions to run assignment locally
See (Development Setup)[DevelopmentSetup.md] for a local dev environment and AWS deployment instructions. To run locally you can install the Serverless Offline plugin.

### What did you not include in your solution that you want us to know about?
Were you short on time and not able to include something that you want us to know
about? Please list it here so that we know that you considered it.

### Other information about your submission that you feel it's important that we know if applicable.

### Your feedback on this technical challenge
Have feedback for how we could make this assignment better? Please let us know.


