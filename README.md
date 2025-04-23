# Inventory Manager (Under active development example readme)
This is a small but feature packed inventory managment solution, create account, access control, dash board, rich statistics and analistics of inventory, Track any thing with
custom tags and specifics of whatever you want to track all of this can be used as statistics to gain further insight on your inventory from daily / weekly stats like incoming inventory
to growth over time and averages or median costs or ammounts of inventory.

This was built with [React Router](https://github.com/remix-run/react-router), [CSS Modules](https://github.com/css-modules/css-modules), [Tailwind](https://github.com/tailwindlabs/tailwindcss), [Ark UI](https://ark-ui.com), [Typescript](https://github.com/microsoft/TypeScript), [Zod](https://github.com/colinhacks/zod), [Drizzle](https://github.com/drizzle-team/drizzle-orm)

## Screenshots

![Home](./assets/inventory-manager-dashboard.png)

## Docker
- Build
    1. `git clone https://github.com/UnderscoreOfficial/Inventory-Manager.git`
    2. `docker build -t Inventory-Manager:1.0 .`
- Load
    1. Download the [latest release](https://github.com/UnderscoreOfficial/Inventory-Manager/releases)
    2. `docker load -i <release_name.tar>`

## Docker Compose
- docker compose example:
```
services:
  inventory-manager:
    image: inventory-manager:1.0
    container_name: inventory-manager
    environment:
      - DATABASE_URL=your_database_here
    ports:
      - 4444:3000 # left port number can be changed 
    restart: always
```
- compose file should be .yaml can be named anything.
-`docker compose -f <file_name.yaml> up -d`

