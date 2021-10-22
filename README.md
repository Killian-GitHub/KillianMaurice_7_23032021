## Welcome to the Groupomania project made with `REACT, NODE.JS and MYSQL`

You can download this project and launch the application by following the following instructions.

## First open the database file

Connect to mysql on your machine and create a database with the command: CREATE DATABASE groupomaniaDb;

Then import the database located in the file with the command: mysql -u root -p groupomaniaDb < groupomaniaDb.sql;

Place the path of the file in your machine in front of "groupomaniaDb.sql"

## Open the backend file

Create an .env file then complete the following instructions:

DB_NAME="groupomaniaDb"
DB_USER="..Enter here your machine's MySQL account user.."
DB_PASSWORD="..Enter here your machine's MySQL account password.."
DB_HOST="localhost"
DB_PORT="3306"
DB_TEST="groupomania_test"
DB_PROD="groupomania_prod"
DB_DIAL="mysql"
AUTH_TOKEN="RANDOM_SECRET_TOKEN"

Download node_modules with the command "npm install"

Launch the server with the command "node server" or "nodemon serve"

The server should start on port 3000 [http://localhost:3000]

## Open the frontend file

Create an .env file then complete the following instructions:

SKIP_PREFLIGHT_CHECK=true
REACT_APP_API_URL="http://localhost:3000"

Download node_modules with the command "npm install"

Launch the server with "npm start" or "yarn start"

Accept the invitation of the app to open it on a port other than 3000

### Good visit !

To access the admin account enter:
EMAIL: admin@groupomania.com
PASSWORD: Grpadmin21