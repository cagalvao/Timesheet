#!/bin/bash
sudo pkill mysql

docker-compose down

cd back_end
npm run refresh_docker_volume
npm run swagger

docker-compose up -d mono_db
docker-compose up -d mono_api
docker-compose up -d mono_fe
docker-compose up -d swagger