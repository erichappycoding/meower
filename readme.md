Github repository: https://github.com/erichappycoding/meower.git

Video: https://www.youtube.com/watch?v=JnEH9tYLxLk&list=WL&index=7&t=1221s

DB - Using Atlas Mongo DB
> meowerAdmin / Uio..
> meowerUser / Uio..

[x] Install express and morgan
>npm i express morgan

- morgan is to capture all requests ... (to read more)

[x] npm i --save-dev nodemon  => auto restart node server for once server files are changed

[x] npm i cors
>> ORS : NPM package to handle CORS(Cross-origin resource sharing) request.

[x] npm i bad-words
>> filter bad words entered by users.

[x] npm i express-rate-limit
>> to limit number of requests / s -> limit to 1 request per 15 seconds
>> Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

========================
[x] using dotenv to store secrets into environment variables
https://www.npmjs.com/package/dotenv

> npm install dotenv

Preload:
You can use the --require (-r) command line option to preload dotenv. By doing this, you do not need to require and load dotenv in your application code. This is the preferred approach when using import instead of require.

$ node -r dotenv/config your_script.js
========================

[x] npm i -g now
>> install now to use 'now secrets' to encrypt environment variables like connection string to DB
>> now secrets add <variable_name> <variable_value>
>> reference: https://zeit.co/docs/v2/serverless-functions/env-and-secrets

[x] Git repository and Commit code
> git init      >> to initialize git repository for the project

> project_folder>git add .
> project_folder>git commit -m "comment ... "

  Reference for git commands: https://www.git-tower.com/learn/git/commands/git-commit

[x] Deploy backend/server to now.sh e.g. https://meower.erichappycoding.now.sh

 1) Create environment varibale on now.sh
> now secrets add mongo_uri mongodb+srv://<username>:<password>@cluster0-wuca6.mongodb.net/meower?retryWrites=true&w=majority

 2) Deploy:
>  now -e meower_db_atlas=@mongo_uri       //mongo_uri: environment variable which contains the connection string to meower DB on Atlas MongoDB.

> Guidelines on Deployment to Zeit Now: https://medium.com/@joranquinten/how-to-deploy-a-nodejs-server-on-zeits-now-platform-e713207313d3

> now alias YOUR_LAST_DEPLOYMENT_URL weather.my-example.com

COMMANDS:

Start server: view package.json / script section
- dev mode with nodemon: > npm run dev
- start at normal mode: > npm start


Public links:

- Client: https://client-mocha-theta.now.sh/
- Server API: https://meower.erichappycoding.now.sh/mews