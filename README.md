# PriceMeow

This helps people considering college determine what colleges will make their wallet purr...with not being empty.

## How the Result is Determined

### Determining a Loan Amount from Current Income

1. First, a user's current annual income is divided by 12. This is their monthly income. Next, this amount by 0.01, which is equivalent to 10% of the user's monthly income.

2. This monthly income is multiplied
    >**NOTE:** All loan calculations are 


The user is required to answer six short questions about their grad school goals. These questions are then used to determine what school a user can attend.

### Affordability

First, the app determines which schools the user is able to afford. It calculates this by the current amount a user has saved, the amount they're spending per month, and the amount they're willing to take on in debt.

NOTE: The debt amount is fixed based on the User's savings and monthly payments for college.

### Future Income

Next, the app examines the median income of graduates in the User's field. This data is compared with the user's current income, and the difference is examined against the total cost of tuition and the amount the user is willing to take on in debt.

All schools that will result in debt that cannot be paid off in 5 years or less are filtered out.

### Schools to Shop

What's left is all the schools that the user can afford. This helps the user determine what schools they should focus their energy on.

## Where to Find the Thing Online


## Roll Your Own Setup and Deploy

This is the slightly more complicated, but slightly more fun way of doing things. There are two major steps to it: configuring your AWS credentials and then configuring the app environment.

All of the following instructions were designed for MacOS 10.13 (High Sierra).

### AWS Credentials

1. Install the AWS CLI.
2. Set up an IAM user profile to use with the application. You can use your own credentials, or use the AWS IAM console to create a new user. I recommend setting up a user called `serverless`.
3. Once you've decided which to use, make sure you set up your profile using the AWS CLI. You can see the profiles you've set up locally by running `cat ~/.aws/credentials`. You should see the profile name you've configured in brackets (i.e., `[profilename]`). Remember this, because that will be the one you're going to use.

### Configuring Your Environment

1. Install Node.js 6.10.3. This is the latest version supported by AWS Lambda. I like to use NVM to manage my Node versions.
2. Install serverless (`npm install -g serverless`).
3. Install Yarn. On a Mac, Homebrew is a good option (`brew install yarn` or, if you use NVM, `brew install yarn --without-node` so that it will default to the Node version specified by your `.nvmrc` file.