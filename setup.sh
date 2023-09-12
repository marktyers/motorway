#!/bin/bash

sudo add-apt-repository -y ppa:git-core/ppa
sudo apt update -y
sudo apt upgrade -y

apt-get install -y curl git gnupg2 jq sudo unzip zsh

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# restart terminal
source ~/.bashrc
nvm list-remote
nvm install v20.6.0
node -v

npm init
npm install express postgres nodemon dotenv
npm install nodemon concurrently eslint typescript jest supertest @types/express @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npm install -g typescript --save-dev
npm install dotenv

npm install --save-dev babel-jest @babel/core @babel/preset-env
npm install --save-dev @babel/preset-typescript
npm i --save-dev @types/pg

tsc --init

	# sudo apt install -y postgresql postgresql-contrib
	
	sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
	wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
	sudo apt install -y postgresql

	sudo systemctl enable postgresql
	sudo systemctl start postgresql
	ps axf | grep postgres

# Need to add codio account.

sudo su - postgres
psql -U postgres

# run these commands in the database
# create role codio with createdb login password 'p455w0rd';
# \du

psql -U codio -d motorway -a -f ./scripts/dump.sql

echo
echo "========= CUSTOMISING SHELL PROMPT =========="
if grep PS1 ~/.profile
then
	echo "profile updated"
else
	echo "profile needs updating"
	echo "PS1='$ '" >> ~/.profile
	echo "clear" >> ~/.profile
fi

echo
echo "======= SETTING ENVIRONMENT VARIABLES ========"
if grep POSTGRES_USER ~/.bashrc
then
	echo "environment variables already added"
else
	echo "adding environment variables"
	echo 'POSTGRES_USER="codio"' >> ~/.bashrc
	echo 'POSTGRES_DB="motorway"' >> ~/.bashrc
fi