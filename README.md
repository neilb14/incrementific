# incrementific
Serverless project to increment a counter

## Notes

### Date
The date you're submitting this.

### Location of deployed application
Base path is: `https://8lldynes7j.execute-api.us-east-1.amazonaws.com/dev/`

### Time spent
How much time did you spend on the assignment? Normally, this is expressed in hours.

### Assumptions made
- We need to support concurrent requests. Therefore using Redis to keep state and enforce consistency in read/set/increment actions.

### Shortcuts/Compromises made
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


