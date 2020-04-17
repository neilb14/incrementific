# Incrementific Development Setup

## Install Dependencies
1. Install and setup Nodejs and NPM

    https://nodejs.org/en/download/package-manager/

2. Ensure Nodejs is installed.

    ```bash
    node -v
    ```

3. Install Serverless framework

    https://serverless.com/framework/docs/providers/aws/guide/quick-start/

    ```bash
    npm install -g serverless
    ```

4. Set up the AWS Credentials (if not done previously)

    ```bash
    serverless config credentials --provider aws --key <AWSAccessKeyId> --secret <AWSSecretKey>
    ```
    For more info: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html

5. Install all the dependencies per package.json

    ```bash
    cd incrementific
    npm install
    ```

## Deploy to AWS
```bash
  serverless deploy
```
