#!/bin/sh
start-main.sh & 
start-app1.sh &
start-vue-admin.sh & 
start-vite-project.sh & 

wait