# How to run:

make sure you have node js v21.x and greater and postgreSQL installed 

clone repo and create .env file in /backend containing JWT_SECRET, JWT_EXPIRES_IN and optionally PORT.

do ``npm run dev`` in ./frontend then start the server with ``npm run start`` in ./server

now you should have frontend running on port ``5173`` and backend running on port ``3000`` or specified in .env

to test the app go to frontend url e.g. ``http://localhost:5173/``. 

this is not the finished project, but right now you can do auth, creating and managing workspaces and boards 
