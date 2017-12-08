# PriceMeow

PriceMeow helps parents and students find a college that will make their wallets purr...with not being empty.

![Graduating is hard](https://i.pinimg.com/736x/34/19/d9/3419d97a19677f1d388ae0cb7a9ce971--funny-graduation-caps-decorated-graduation-caps.jpg)

## Contents

- [How It Works](#how-it-works)
- [Where the Data Comes From](#where-the-data-comes-from)
- [Where to Find PriceMeow Online](#where-to-find-pricemeow-online)
- [Roll Your Own: A Guide to Self-Deployment](#roll-your-own-a-guide-to-self-deployment)
  - [1. Configuration](#1-configuration)
    - [Accounts and Services](#accounts-and-services)
    - [AWS Credentials](#aws-credentials)
    - [Install Node.js v6.10.3](#install-nodejs-v6103)
    - [Install Yarn](#install-yarn)
  - [2. Deploy the Backend](#2-deploy-the-backend)
    - [Configure Your Environment Variables](#configure-your-environment-variables)
    - [Check Your AWS Profile Name](#check-your-aws-profile-name)
    - [Run Tests](#run-tests)
    - [Deploy](#deploy)
    - [Add the API URL to Your Environment](#add-the-api-url-to-your-environment)
  - [3. Deploy the Frontend](#3-deploy-the-frontend)
    - [Build the Files](#build-the-files)
    - [Run Locally or Deploy](#run-locally-or-deploy)

## How It Works

Please refer to the [How It Works](https://github.com/JohnTheSixth/pricemeow/wiki/How-It-Works) page in the [PriceMeow Wiki](https://github.com/JohnTheSixth/pricemeow/wiki), which covers the app's workings in extensive detail.

## Where the Data Comes From

Please refer to the [Where the Data Comes From](https://github.com/JohnTheSixth/pricemeow/wiki/Where-the-Data-Comes-From) page in the [PriceMeow Wiki](https://github.com/JohnTheSixth/pricemeow/wiki), which covers the datasets used by the  app and where they are sourced from.

## Where to Find PriceMeow Online

PriceMeow is available [here](https://s3.us-east-2.amazonaws.com/pricemeow/index.html), hosted from an S3 bucket. The fun part about PriceMeow is that it's one `.html` and one `.js` file, so you can host them from pretty much anywhere that hosts static HTML files (like [GitHub Pages](https://pages.github.com/)).

## Roll Your Own: A Guide to Self-Deployment

This is the slightly more complicated, but more fun way of doing things. There are several steps, which are detailed below in the order you need to do them.

All of the following instructions were designed for MacOS 10.13 (High Sierra).

### 1. Configuration

#### Accounts and Services

Two accounts are needed in order to deploy PriceMeow:

1. A [Data.world](https://data.world/) account
2. An [Amazon Web Services](https://aws.amazon.com/) account

Data.world is free to sign up for and use for personal projects. AWS is free for one year, if you are creating a new account. 

#### AWS Credentials

After signing up for your AWS account, you will need to configure an IAM user profile and that user's AWS credentials.

I recommend following the directions in the [Serverless docs](https://serverless.com/framework/docs/providers/aws/guide/credentials/) to get up and running. In particular, you will need to:

1. [Create AWS Access Keys](https://serverless.com/framework/docs/providers/aws/guide/credentials#creating-aws-access-keys).
2. [Configure your AWS Profile](https://serverless.com/framework/docs/providers/aws/guide/credentials#using-aws-profiles) using the `aws-cli`.

If you believe you've already set up your AWS Credentials, you can see the profiles you've set up locally by running `cat ~/.aws/credentials` in your terminal. You should see the profile names you've configured in brackets (i.e., `[profilename]`).

You can either use this profile, or configure another IAM user profile called `serverless`. The PriceMeow back-end will look for a profile with this name by default.

Either way, remember the profile name you want to use. You will need it later.

#### Install Node.js v6.10.3

Node.js v6.10.3 is the latest version supported by AWS Lambda; hence that was the version used to develop PriceMeow.

If you are running another version of Node, [NVM](https://github.com/creationix/nvm) is a good Node version manager.

If you have NVM installed, just run `nvm use` in the `frontend` or `backend` directories, or run `cd backend && nvm use` from the root. NVM will then use 6.10.3. If it's not installed, NVM will prompt you to do so.

#### Install Yarn

If you're on a Mac, it's recommended to use Homebrew to install Yarn.

If you're using NVM, run:

```
brew install yarn --without-node
```

Otherwise, run:

```
brew install yarn
```

If you don't have Homebrew, or don't like it, or aren't on a Mac, follow the [Yarn installation docs](https://yarnpkg.com/lang/en/docs/install/) to find an alternative method of installation.

#### Install the Yarn/NPM Packages

After Yarn is installed, run the following from the root directory, one after the other:

```
cd backend && yarn install
cd frontend && yarn install
```

This will install the Node modules for each directory. You should now be (almost) ready to deploy.

### 2. Deploy the Backend

From the root directory, run `cd backend` to change your working directory to `backend`.

#### Configure Your Environment Variables

Remember how you signed up with Data.world? Well now, log into your account and go to Avatar (in the upper right) > Settings > Advanced. You'll see two API tokens: a Read/Write and an Admin. Copy the Read/Write token. You will then need to export it to your shell environment as `DW_AUTHKEY`, but you will need to add the text string `Bearer ` to the beginning of it (note the space after `Bearer`). Your command would look something like this:

```
export DW_AUTHKEY='Bearer <<your-copied-dw-read-write-key>>'
```

Alternatively, you can copy the above command to your `.bashrc` or `.zshrc` file (or whatever flavor your shell source is) so that it loads into your environment every time.

#### Check Your AWS Profile Name

Remember how you configured your [AWS Credentials](#aws-credentials)? Well now, open `serverless.yml`. Under the `provider: profile` key is the profile named `serverless`. Make sure you have a local profile with this name. If you don't either create one (per the directions above) or replace `serverless` in the yml with your existing profile.

#### Run Tests

If you want to make sure everything is peachy keen with the code before you deploy it, run:

```
yarn test
```

This will run the tests (which should pass, unless you messed them up somehow...c'mon).

#### Deploy!

Once the tests have passed, run the following:

```
yarn sls deploy
```

This executes the `serverless` binary in the `backend/node_modules/.bin` directory, and uses your AWS credentials to deploy a bunch of neat AWS stuff like CloudFormation templates, the `moneymeowser` Lambda, an API Gateway, and other wizardry.

#### Add the API URL to Your Environment

Once the deploy is done, you should see printed to your terminal the URL of the GET endpoint of your API. It will look something like this:

```
api keys:
  None
endpoints:
  GET - https://somethingsomething.execute-api.us-east-2.amazonaws.com/dev/meow
functions:
  moneymeowser: pricemeow-dev-moneymeowser
```

Copy the url under `endpoints`, then export it to an environment variable in your shell with the name `AWS_API_URL`:

```
export AWS_API_URL='https://somethingsomething.execute-api.us-east-2.amazonaws.com/dev/meow'
```

Again, it might be worthwhile adding this to your .bashrc/.zshrc file for future use.

Now you're ready to get the frontend up and running!

### 3. Deploy the Frontend

From the backend directory, run `cd ../frontend` to change to the frontend directory. Otherwise, run `cd frontend` from the root of the project directory.

#### Build the Files

Run the build command:

```
yarn build
```

This transpiles all of the the React components into the `public/bundle.js` file. **NOTE:** The `public/bundle.js` file _is not_ tracked in git, while the `public/index.html` file _is_.

#### Run Locally or Deploy

Since PriceMeow is just a single-page React app, you can load the `frontend/public/index.html` directly into your browser to run it. Otherwise, you can deploy it to any location that serves static html pages, like [GitHub Pages](https://pages.github.com/) or an S3 Bucket.

Congratulations! You're done!
