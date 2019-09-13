# Intelligo Systems API

[![Greenkeeper badge](https://badges.greenkeeper.io/ERS-HCL/nxplorerjs-microservice-starter.svg)](https://greenkeeper.io/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FERS-HCL%2Fnxplorerjs-microservice-starter.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FERS-HCL%2Fnxplorerjs-microservice-starter?ref=badge_shield)

[![Build Status](https://travis-ci.org/ERS-HCL/nxplorerjs-microservice-starter.svg?branch=master)](https://travis-ci.org/ERS-HCL/nxplorerjs-microservice-starter) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![GitHub version](https://badge.fury.io/gh/ERS-HCL%2Fnxplorerjs-microservice-starter.svg)](https://badge.fury.io/gh/ERS-HCL%2Fnxplorerjs-microservice-starter) [![Dependency Status](https://david-dm.org/ERS-HCL/nxplorerjs-microservice-starter.svg)](https://david-dm.org/ERS-HCL/nxplorerjs-microservice-starter) [![DeepScan grade](https://deepscan.io/api/projects/2880/branches/21484/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2880&bid=21484)

---

![Chatbots.mn](public/logo.png)

Chatbots.mn Cloud Native Node JS Express Reactive Microservice (REST/GraphQL)
This project provides complete Node JS / Typescript based microservices template with all that will be needed features for production deployment , monitoring , debugging , logging , security , CI/CD. Reactive extensions based samples are added as well to demonstrate how this can be used for building a microservice API edge-service , a backend for frontend or use it as a base for building any kind of microservice.

![architecture vision](screenshots/chatbots-microservice.png)

# Table of contents

- [Design Principles](#design-principles)
- [Features](#features)
- [REST APIs](#rest-apis)
- [GraphQL APIs](#graphql)
- [GraphQL Client APIs](#graphql-client-apis)
- [Installation Prerequisites](#pre-requisites)
- [Installation](#install-it)
- [External Environment Configuration Details](#setup-external-environment)
- [Build Modes](#run-it)
  - [Development](#run-in-development-mode)
  - [Production](#run-in-production-mode)
  - [Debug in VSCode](#run-in-vs-code-debug-mode)
- [Tests](#runs-tests-with-code-coverage)
  - [Unit Tests](#run-unit-tests)
  - [Integration Tests](#run-integration-tests)
- [Run It](#try-it)
- [File Structure](#file-structure)
- [Passing UUID for requests](#log-with-uuid)
- [GraphQL Directives](#graphql-directives)
- [GraphQL Mocks](#graphql-mocks)
- [REST API Mocks](#restapi-mocks)
- [Docker Build](#build-docker-image)
- [Kubernetes Deployment](#k8s-deployment)
- [Debug Dashboard](#using-node-dashboard-view-development-only)
- [Security](#security)
  - [JWT GraphQL APIs](#jwt-security-graphql)
  - [JWT REST APIs](#jwt-security-rest-apis)
    - [Role Based Access](#rbac-test)
  - [CSRF](#csrf-security)
  - [Compression](#compression)
- [Hystrix Support](#hystrix-circuit-breaker-support)
- [Sonar Integration](#integrate-with-sonarqube-for-continous-code-quality)
- [Load Testing](#load-testing)
- [Future Roadmap](#future-roadmap)
- [Deploying to Heroku](#deploying-to-heroku)
- [FAQ](#faq)
- [License](#license)

## Design Principles

- Use best of breed modules to create a production ready microservice framework
- Based on the 12-factor app principles
- No custom code or wrappers so that any developer can modify/replace any of the modules or implementation
- Design patterns for implementation that can be used as a reference
- Modular , replacable and plug and play code
- Provide a starter for both the business APIs and microservice platform development.
- DevOps ready with code quality, unit & integration tests, deployment automated.

## Features

- Node JS, Express, Typescript , Dependency Injection base
- Backpack (webpack) based - build , development , packaging
- Swagger Enabled - Express swagger middleware / Swagger UI integration
- GraphQL based on Apollo Server 2.0 with JWT security , data loader and REST data source samples
- Support for GraphQL SDL via graphql-import
- GraphQL mock resolvers (optional) during development - graphql-tools
- GraphQL based client wrapper APIs - graphql-request
- REST APIs - using Inversify Controller
- Externalized Configuration - DotEnv (Settings, Env specific API URLs)
- Tests - Jest , SuperTest , GraphQL Tester. Infrastructure for automated unit and integration tests
- Code Coverage - Istanbul
- Code Quality - tslint
- Container support - Docker , Kubernetes Clusters
- Helm Chart based deployment support
- Prometheus integration
- API Response Logging , Express Server Logging , UUID propogation - Pino
- Reactive Extensions support - RxJS6
- CORS, JSONObject Limit , Helmet , CSRF - Express Security
- IOC / Dependency Injection / Express Annotation based APIs - Inversify
- Documentation - TypeDocs
- API Exception Handling Utilities
- Standard HTTP Codes for cleaner code
- Sample APIs, Patterns for reference
- Sonar Qube integration
- Hystrix Circuit Breaker Support (Using Brakes)
- JWT Based API Security - jsonwebtoken, express-jwt
- Now using the super fast pino logger for all logging needs
- Additional performance time logging built in

See REST API /examples/{id}

```json
{
  "pid": 3984,
  "hostname": "LP-507B9DA1D355",
  "level": 30,
  "time": 1515813665734,
  "0": {
    "socket": 5.656709999995655,
    "lookup": 186.8375229999947,
    "connect": 389.5646870000055,
    "response": 594.8022639999981,
    "end": 599.1270230000082
  },
  "v": 1
}
```

### REST APIs
- The API Spec can be downloaded using the following URLS
```
http://localhost:3000/api-docs/Api.yaml
```
```
http://localhost:3000/api-docs/
```
- examples - Basic examples with a search by ID example from the jsonplaceholder API (/examples/:id)
- shop - Example of how to use Reactive Extensions for API orchestration (FlatMap) (/shop/priceByOptionId/:id)
- starwars - Example of how to use Reactive Extensions for API orchestration (ForkJoin) (/starwars/people/:id)
- hystrix - Example of how to use the circuit break pattern for APIs (/hystrix)
- scraper - Example of how to use scrape-it to scrape data from a website (/scraper)
- Use swagger UI for the complete list of sample APIs
- metrics - Prometheus based metrics added for all APIs (/metrics)
- API Partial JSON response support

## Pre-requisites

Install npm and nodeJS

npm version >= 3.x
node version >= 6.x

## Install It

```bash
npm install
```

## Setup _external environment_

- Edit the **.{PROFILE}.env** file (where the PROFILE could be test, development , production)

| Variable              | Description                                                                                             | Default Value |
| --------------------- | ------------------------------------------------------------------------------------------------------- | ------------- |
| PORT                  | Server Port                                                                                             | 3000          |
| LOG_LEVEL             | Log Level (info,debug,error)                                                                            | info          |
| SESSION_SECRET        | String used for signing cookies                                                                         |               |
| API_TIME_OUT          | Default API Timeout (in milli secs)                                                                     | 10000         |
| TEST_TIME_OUT         | Default Test Timeout (in milli secs)                                                                    | 10000         |
| JWT_AUTH              | Enable/Disable JWT based API security                                                                   | true          |
| RSA_PRIVATE_KEY_FILE  | Sample RSA private key path                                                                             |               |
| RSA_PUBLIC_KEY_FILE   | Sample RSA public key path                                                                              |               |
| TOKEN_EXPIRY_TIME     | JWT Token expiry (Generated from /login )                                                               | 1 hour (1h)   |
| STREAM_HYSTRIX        | Enable/Disable Hystrix streaming server (true or false)                                                 | false         |
| CORS                  | Enable/Disable CORS on the server (true or false). Will work only in production build                   | false         |
| CLUSTER_MODE          | Enable/Disable Node Clustering on the server (true or false)                                            | false         |
| SWAGGER_API_DOCS_ROOT | Serves your Swagger API file(s) so they can be used with front-end tools like like Swagger UI, PostMan. | /api-docs/ |
| GRAPHQL_SUBSCRIPTIONS | Enable/Disable GraphQL subscriptions (true or false)                                                    | true          |
| GRAPHQL_PLAYGROUND    | Enable/Disable GraphQL Playground (true or false)                                                       | true          |
| GRAPHQL_TRACING       | Enable/Disable GraphQL tracing (true or false)                                                          | true          |
| GRAPHQL_MOCK          | Enable/Disable GraphQL Mock for unimplemented Interfaces(true or false)                                 | true          |
| API_MOCK              | Enable/Disable REST API Mock unimplemented routes(true or false)                                        | true          |

## Run It

### Run in _development_ mode

```bash
npm run dev
```

### Run in _production_ mode

```bash
npm run compile
npm start
```

#### Run in _VS Code debug_ mode

```bash
npm run compile
Press F5
```

#### Runs tests with code coverage

#### Run Unit Tests

- Unit Tests are located in the same directory as the module or class being tested
- All Unit tests need to have an extension \*.spec.ts

```bash
npm run test
```

#### Run Integration Tests

- Integration tests are located in the same directory as the module or class being tested
- All Unit tests need to have an extension \*.itest.ts
- First built the integration test . This will setup the integration test environment in the build

```bash
npm run itest:build
```

- Run the node server and run the integration tests against it
- This waits for the server to start , runs the test and then terminate all processes on completion

```bash
npm itest:run
```

### Try It

- Point you're browser to [http://localhost:3000](http://localhost:3000).
- Invoke the example REST endpoints directly or via swagger `http://localhost:3000/swagger`
- Invoke the prometheus metrics using the endpoint `curl http://localhost:3000/metrics`
- Access the health check api `curl http://localhost:3000/healthcheck`

### File Structure

```
├───public                      * Landing page for nxplorer server
├───screenshots                 * Sample screenshots
└───server                      * Server configuration and apis
|   ├───api                     * REST APIs defined on the server
|   │   ├───controllers         * API controllers using RxJS, Inversify
|   │   │   ├───examples        * Examples controller
|   │   │   ├───hystrix-demo    * Hystrix demo controller
|   │   │   ├───security        * JWT login API controller
|   │   │   ├───shop            * Sample shop APIs with products, prices , inventory
|   │   │   └───starwars        * SWAPI controller
|   │   ├───interfaces          * Service interfaces
|   │   ├───models              * API data models
|   │   └───services            * Service API implementations
|   ├───common                  * Server setup and configuration
|   │   ├───config              * Server configuration
|   │   ├───constants           * Inversify and other common identifier constants
|   │   ├───interfaces          * Common service interfaces  
|   │   ├───middleware          * Custom middleware
|   │   ├───models              * Common API data models
|   │   ├───services            * Common service implementations
|   │   └───swagger             * Swagger API specification (YAML)
|   |   └───env.ts              * DotENV configuration
|   |   └───server.ts           * Express Server setup and configuration
|   └───index.ts                * Main Server entry point
├───helm                        * Helm chart deployment scripts
│   ├───charts                  *
│   └───templates               *
└───backpack.config.js          * Backpack configuration
└───package.json                * npm dependencies
└───build.js                    * ShellJS utility build scripts
└───deploy-k8s.sh               * Kubernetes deployment script
└───Dockerfile                  * Docker build file
└───docker-compose.yml          * Docker build and run file
└───build-docker.bat|sh         * Docker build file
└───itest.config.json           * Jest integration test configuration
└───unit.config.json            * Jest unit test configuration
└───tsconfig.json               * typescript config
└───tslint.json                 * tslint config
└───.{profile}.env              * externalized environment files based on profiles (development,test,production)
└───sonar-properties.json       * sonarscanner|SonarQube configuration
└───jwtRS256.key|.key.pub       * Sample JWT private and public keys used by the server
```

### Log with UUID

- A sample implementation of UUID propogation has been added. This depends on a cookie 'UUID' to be set in the request object. The [LogService](server/common/services/log.service.ts) will add the uuid to all logs it generates.

- For example if 'UUID' is set to xxxx-dddd-ssss-wwww-ssss then calling the /shop/products API will produce

```json
{
  "pid": 13492,
  "hostname": "LP-507B9DA1D355",
  "level": 30,
  "time": 1515859200496,
  "uuid": "xxxx-dddd-ssss-wwww-ssss",
  "fullUrl": "http://localhost:3000/api/v1/shop/products",
  "statusCode": 200,
  "responseTime": "1.187",
  "v": 1
}
```

### RestAPI Mocks

- Enable `API_MOCK=true` in the `.<Profile>.env` file . Note: For security this will not work in production mode even if `API_MOCK` is set to `true`
- The `swagger-express-middleware` module provides out of the box support for [automated mock generation](https://github.com/BigstickCarpet/swagger-express-middleware/blob/master/docs/middleware/mock.md)
- Steps
  - Define the API swagger specification in [Api.yaml file](server/common/swagger/Api.yaml)
  - If there is no implementation available in the express routes, the middleware creates mocks for those apis
- Access the swagger ui provided by nXplorer (/swagger) and refer to the apis tagged `Mock API` and with prefix `/mock`.The sample has two main entities - cars and drivers. You can search , perform CRUD operations as well as upload and download images.

#### Build Docker image

```bash
./build-docker.sh
```

#### Using node dashboard view (Development Only)

- To use the node dashboard view

```bash
npm run compile
npm run dash
```

- This will start up the application with the node dashboard attached providing details of the memory , cpu and logs

#### Security

- JWT based security has been implemented using [sample JWT private and public keys](https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9)
- Both the REST APIs and GraphQL have sample implementations added.
- The authentication middleware code can be viewed [here](server/common/middleware/auth-middleware.ts)

#### JWT Security REST APIs

- If the JWT Security is enabled , we need to use the /login API to get the sample JWT Token (currently set at an expiry of 1 hour)

```bash
curl -X POST "http://localhost:3000/api/v1/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"test@gmail.com\", \"password\": \"pwd\", \"role\": \"admin\"}"
```

- The sample output . Note the JWT token is the value of the property **idToken**

```json
{
  "idToken":
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTQ4NjQ3ODMsImV4cCI6MTUxNDg2ODM4Mywic3ViIjoidGVzdEBnbWFpbC5jb20ifQ.hAEa6AL1Kxxxxxxx",
  "expiresIn": "1h"
}
```

- The api/v1/examples APIs a valid JWT token must be passed in all the queries in the ‘Authorization’ header. Note this is done just as an example. You can easily enable addition endpoints similarly.
  - Please see the [examples controller](server/api/controllers/examples/controller.ts)
    ```typescript
    @controller('/examples', authMiddleware(<User>{ role: 'admin'}))
    ```
  - The function [authMiddleware](server/common/middleware/auth-middleware.ts) takes care of validating the JWT token passed in the header.
  - This can be extended to support role based access as well and the provision for that is added.
  - Note: as a demo sample public and private keys have been provided. Ideally these are maintained externally in a real world scenario JWKS (JSON Web Key Set) endpoints
- The following syntax must be used in the ‘Authorization’ header :
  Bearer xxxxxx.yyyyyyy.zzzzzz
- Testing using the [swagger ui]/(http://localhost:3000/swagger)
  - Click on the ‘Authorize’ button and set the Bearer token as mentioned above
  - Now all the /examples related APIs will work

##### RBAC Test

- If the JWT Security is enabled and we use the /login API to get the sample JWT Token but with role as "guest" instead of "admin"

```bash
curl -X POST "http://localhost:3000/api/v1/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"test@gmail.com\", \"password\": \"pwd\", \"role\": \"guest\"}"
```

- On setting the Bearer token in the ‘Authorization’ header for subsequent calls to any of the /examples APIs will result in a role based authorization failure

![RBAC](screenshots/rbac1.PNG)

### GraphQL Directives

- This is work in progress.
- Currently added a sample for using the @date directive (as explained in the graphql-tools documentation)
- Query (`{ today(format: "mmm-dd-yy") }`) - Here the format is based on the `@date` scheme Directive , that takes the output of the resolver and formats the date before sending it out to the client
- Query ( `{ examplesWithAuth { id name } }` - This is a variation to the `examples` query mentioned in the section [JWT GraphQL APIs](#jwt-security-graphql). The difference here is that we use a `@auth` directive to handle the authentication based on the role instead of hardcoding the implementation in the resolver. This is a much cleaner and decoupled from the resolver.
- The query schema `examplesWithAuth: [ExampleType] @auth(requires: ADMIN)` uses the `@auth` directive which will intercept the call check for an authenticated user with appropriate role. (Note: You need to run the `login` mutation before and then set the HTTP Header with the Authorization token )

![schema directive](screenshots/schemaDirectives.png)

#### CSRF Security

- CSRF Security has been enabled in the **production** mode
- All POST APIs will require to read the cookie 'XSRF-TOKEN' set in the browser and then pass it in the response head with either of the following keys
  - req.headers['csrf-token'] - the CSRF-Token HTTP request header.
  - req.headers['xsrf-token'] - the XSRF-Token HTTP request header.
  - req.headers['x-csrf-token'] - the X-CSRF-Token HTTP request header.
  - req.headers['x-xsrf-token'] - the X-XSRF-Token HTTP request header.

#### Compression

- Compression is enabled by default on the server and is based on the [compression module](https://www.npmjs.com/package/compression)
- The configuration details are present in [the compression.ts file](server/common/config/compression.ts)
- In case there is a need to get responses without compression pass the key `x-no-compression` in the request header

#### Hystrix Circuit Breaker Support

- Circuit breaker support has been added to the project and uses the hystrix compliant module [brakes](https://github.com/awolden/brakes)
- Streaming support has been disabled by default for Hystrix.
- Enable it by setting the STREAM_HYSTRIX property to "STREAM_HYSTRIX=true" in the [.env](.env) file
- For convienence a docker version of the Hystrix server has been provided and setup in the [docker-compose.yml](docker-compose.yml) file

##### Steps to execute on Docker

```bash
npm run compile
docker-compose build
docker-compose up
```

- On Docker set up the port forwarding for 3000 and 8080

![port forwarding](screenshots/port-forwarding.PNG)

- Access the Hystrix dashboard at localhost:8080/hystrix and set the stream location to `localhost:3001/hystrix.stream`
- Execute the samples under /api/v1/hystrix and view the hystrix stream results on the dashboard

![hystrix stream](screenshots/Hystrix.PNG)

### integrate with SonarQube (for continous code quality)

Assuming you have SonarQube 5.5.6 (LTS) installed

- Setup SonarQube with the [Sonar Typescript plugin](https://github.com/Pablissimo/SonarTsPlugin#installation) and the Generic Test Coverage plugin https://docs.sonarqube.org/display/PLUG/Generic+Test+Coverage
- Install sonar-scanner globally (`npm install --global sonar-scanner`)
- Update [`sonar-project.properties`](sonar-project.properties) file for the property `sonar.host.url` to point to your SonarQube server. By default this assumes that the SonarQube server is running locally using the default port
- Run the unit tests

```bash
npm run test
```

- The test results collected in the results folder in the sonar compatible format
- Push results to SonarQube

```bash
npm run sonar-scanner
```

- If working with SonarQube 6.x it supports [Generic Test Data](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data)

Modify the [package.json](package.json) to set the appropriate version of the sonarQube

```json
jestSonar": {
    "reportPath": "reports",
    "reportFile": "test-reporter.xml",
    "indent": 4,
    "sonar56x": true
}
```

Note: for Sonar 6.x turn sonar56x to “false” and that will generate the test report that is using the sonar 6 schema.

### Load Testing

- [loadtest](https://www.npmjs.com/package/loadtest) is an excellent tool for loadtesting
- Steps to use it
- Install it as a global npm module

```bash
npm install -g loadtest
```

- Start the nxplorerjs-microservice

```bash
npm run start
```

- Run the load test against the production build. Given below is one example

```bash
loadtest http://localhost:3000/api/v1/examples/1 -t 20 -c 20
```

## Deploying to Heroku

```bash
heroku create
git push heroku master
heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Future RoadMap

- Add additional health checks

### FAQ

- tslint error appearing in VSCode IDE for node_modules

```json
// Configure glob patterns of file paths to exclude from linting
"tslint.exclude": "**/node_modules/**/*.ts"
```

### Disclaimer

- This is not an official HCL ERS product.

### Thank you

- Special thanks to the JetBrains team for supporting the open source community and this project.
- This is simply the best IDE for developers. 

[![JetBrains image](public/jetbrains.png)](https://www.jetbrains.com/?from=https://github.com/ERS-HCL/nxplorerjs-microservice-starter)

### License

MIT
