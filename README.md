This repo contains admin CMS, Client and Server for the project.

How to run the project:

1. Clone the repo
<br>
<br>

=============== Server ===============

First we need to get the server up and running. The server is built using NodeJS and ExpressJS. It uses MySQL as the database. To run the server, follow the steps below:

2. ```cd server-side```
3. ```npm install```
4. ```npm i sequelize-cli -g``` (if you don't have sequelize-cli installed)
5. ```npm i nodemon -g``` (i'll be using nodemon, you can use node as well)
6. ```npx sequelize db:migrate``` (to create the tables in the database)
7. Create .env file in the root of the project and add the following variables:
    - JWT_SECRETKEY="SECRET"
    - PORT="3000"
7. ```nodemon app.js``` (to start the server)
<br>
<br>

=============== Admin CMS ===============

Now we need to get the admin CMS up and running. The CMS is built using ReactJS. To run the CMS, follow the steps below:

8. ```cd ../admin-side``` (go to admin-side directory)
9. ```npm i```
10. ```npm run dev``` (to start the CMS)
11. Go to http://localhost:3173/ to see the CMS (port usually run in 3173 or 3174, vite default)
12. You can login to the CMS with the following credentials:
    - username: faza@gmail.com
    - password: pass123
13. Enjoy!
<br>
<br>

=============== Client ===============

Now we need to get the client up and running. The client is built using ReactJS. To run the client, follow the steps below:

14. ```cd ../client-side``` (go to client-side directory)
15. ```npm i```
16. ```npm run dev``` (to start the client)
17. Go to http://localhost:3174/ to see the client (port usually run in 3173 or 3174, vite default)
18. Enjoy!