# BlogProject

A mini project meant to be playground for working with different authentication services.
Right now we are using `djangorestframework-simplejwt` on the backend, which simply use token for authentication.

Frontend is written in react only for the reason I'm being more fluent in it compared to Vue. Feel free to swap this out. Since, the logistics of the frontend application will remain the same, it really doesn't matter.

## Flow

FE (login) -> BE (creates token) -> FE (saves token, use it for consequent requests like obtaining authenticated-only resource)

## Setup

- Sqlite db is already included so don't worry about running migrations.
- create `.env` inside `blogapi` and add SECRET_KEY to it.
- `$ docker-compose up`

| username | password      |
| -------- | ------------- |
| admin    | thisisuser123 |
| user1    | thisisuser123 |

#### Note
- This is a playground application so everything mentioned above my not hold, however, I'll try to keep this updated.
- Always make a branch for each authentication framework from this point and don't merge to master until decision is final.