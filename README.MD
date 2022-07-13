### Note 
you need a POSTGRESQL database to be installed.
with the default database named = postgres, user = postgres and password = 123


### setup for Dev
1. `npm install` to install all required npm modules.

2. `npm run CreateDB` To create the dev database.(there is alike command for test but the test command is using it so don't run it twice.)

3. `db-migrate up` to run all the migrations. 

4. `npm run build` to build the server.

5. `npm run start` to run the server.

### setup for testing 
1. `npm install` to install all required npm modules. (if not run before).

2. `npm run test` to do the reset.

### Ports
the database and the server are running on http://localhost: port

the server is running on port 3000 can be changed from .env file.

the database is running on the default port 5432.

### To remove tables
1. `npm run dev_down` run this command to remove all tables from dev database (if wanted to) you can drop directly.
   `npm run test_down` run this command to remove all tables from Test database (if wanted to) you can drop directly.

2. `npm run DropDB` To Drop the dev database.
   `npm run DropDBT` To Drop the test database.