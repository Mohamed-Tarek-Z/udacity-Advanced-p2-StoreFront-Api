### Note 
you need a POSTGRESQL database to be installed.
with the default user = postgres and password = 123


### setup
1. `npm install` to install all required npm modules.

2. (very important)
if postgressql and db-migrate module installed successfully.
then open `.env` file and and put hash symbol ` # ` before the first line. 
the run this command `npm run CDB`.
then after running successfully you should see this line in console '[INFO] Created database "store_front"'.
then remove the hash symbol agine from the .env file

or just create database called "store_front" your self and ignore this step. ^_^!

3. run `npm run test` to run tests.

4. `npm run build` to build the server.

5. `npm run start` to run the server.

### Ports
the database and the server are running on http://localhost: port

the server is running on port 3000 can be changed from .env file.

the database is running on the default port 5432.

### To remove tables
1. `db-migrate reset` run this command to remove all tables from the named database in the .env file.


2. (very important)
open `.env` file and and put hash symbol ` # ` before the first line. 
the run this command `npm run DDB`.
then after running successfully you should see this line in console '[INFO] Deleted database "store_front"'.
then remove the hash symbol again from the .env file

or just Drop the database called "store_front" your self and ignore this step. ^_^!



### note
step 2 in setup and in remove in other words 
( just comment the database name in .env file and run the create or drop command then uncomment it again)

i think it is a problem with db-migrate where it is trying to connect to the named database in the config.json file.
even if you were using "db:create or db:drop" command that should create or drop the database !!
So to fix that i remove the name from the json file so it uses the default name.