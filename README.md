# Hello, welcome to Job Storage!

This is a web app that is currently under development. The current purpose of this app is to store jobs that have been applied for, storing simple information. Also for knowing how much money a person has and has spent.

### Uses
Database: PostgreSQL\
UI/UX: React w/ Bootstrap\
Backend: Node.Js / Express / Javascript
NPM

## Setup

### Git / Edits
1. Find a destination on your computer and pull the repository to it, such as `git clone https://github.com/YelbyTheCat/Job-Storage.git` and wait for it to download
2. Using the same `terminal/command prompt` do `cd Job-Storage` or similar to travel into the folder
3. Assuming `npm` is installed, run `npm i` to install everything
4. Locate the `.example.env` file and remove the `.example`
5. Where it says `BS_THEME` I prefer dark, so it can say `BS_THEME=dark` but if you prefer light mode you can change it to `light` instead of `dark`
6. Where it says `PORT` you can choose the port, I've preferred `3000` so it'll look like `PORT=3000`
7. Where it says `PG_USER` & `PG_PASSWORD` & `PG_DEV_DB_NAME` (default is `cat_utilities_dev`) these are for your local PostgreSQL
8. Run `npm run migrate` to generate the tables
9. Now everything should be done run it by doing `npm run start` then go to [localhost:3000](http://localhost:3000/)

## Road Map
[ ] Add Finance section - Adds a page and database that tracks finances with: filtering, editing, and circular usage
 - Potentially add the ability to link it with a bank (Wells Fargo)
   
[ ] Make into a "git page" with optional database directions (local / personal)

[ ] Add Websocket to mobile app
