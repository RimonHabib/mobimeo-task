#  Mobimeo Backend Task

## Requirements

- Create a service which provides a single API endpoint to search for GitHub users by the programming language they use in their public repositories (i.e. C, Java, Haskell)

- Each user returned in the response of the search request should at least contain the username, name, avatar url and number of followers.

- Use the GitHub APIs (https://developer.github.com/v3/) to retrieve the information. Use a Personal Access Token to avoid being rate limited

- The service should be developed with TypeScript. Feel free to use any libraries you find suitable for this task.

- The service should be covered with tests you find suitable for this task.

- Create a Dockerfile to run the service.

- Please use Git for this project.

# Solution
## Clone the repository
```
git clone git@github.com:RimonHabib/mobimeo-task.git
```
## Setting up the environment variables
> Copy the .env.example file to .env and fill in the values.


# Running the application

## With Docker compose
```
docker-compose up
```

## With Docker
```
docker build -t mobimeo-task .
docker run -p 3000:3000 --name mobimeo-task -d mobimeo-task
```

## With npm
```
npm install
npm run build
npm run start:prod
```

## Access Search API
Browse
http://localhost:3000/api/v1/search?language=javascript

## API Documentation
Browse http://localhost:3000/swagger

## Example with TypeScript, perPage=50, page=2
Browse http://localhost:3000/api/v1/search?language=TypeScript&perPage=50&page=2


## Run the unit tests
```
npm run test
```

## Run the end-to-end tests
```
npm run test:e2e
```
