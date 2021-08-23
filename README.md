# BlogProject

A mini project meant to be playground for working with different authentication services.
On this branch, `integrate-aws-cognito-fe-only`, we are using AWS Cognito to manage user and AWS Amplify for authentication.
Basically, cognito user-pool has user directory and cognito identity-pool is responsible to do handle multiple types of login for same user. Amplify just lets you access this user-pool.

Frontend is written in React only for the reason I'm being more fluent in it compared to Vue. Feel free to swap this out. Since, the logistics of the frontend application will remain the same, it really doesn't matter.

This only has [Register](http://localhost:3000/register) and [Login](http://localhost:3000/login) page working.

## AWS Cognito FE Only

User pool is managed by AWS Cognito and authentication process is aided by AWS Amplify. Amplify uses localStorage to save user data and provides utility functions to work with it. It also handles nuances like refreshing token.

### Findings and doubts

User can make a login, register itself and do other user-management operations. Super easy to implement. But:
- how do we use this logged-in (authenticated) user can communicate with backend? If token is sent to backend, how does backend know that the user corresponding to this token is logged in and is allowed to perform certain tasks (authorized)?
- do we need to move the user table to cognito user-pool, if yes then how multi-tenancy is handled.

## Setup

- `$ docker-compose up` or, since this is frontend only, `$ yarn start` after you are inside `blog_frontend`.
- Use a valid email address to register as you will get a confirmation email. Only after having a confirmed account you will be able to log-in. Otherwise ask me so I can confirm your account from Cognito.

#### Note
- This is a playground application so everything mentioned above my not hold, however, I'll try to keep this updated.
- Always make a branch for each authentication framework from this point and don't merge to master until decision is final.