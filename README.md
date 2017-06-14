# hapijs-bookshelf-mysql

##  Reference
		https://github.com/estate/bookshelf-uuid
		https://github.com/estate/bookshelf-bcrypt
		https://github.com/dwyl/hapi-auth-jwt2
		https://www.npmjs.com/package/jsonwebtoken
		https://github.com/dwyl/hapi-auth-jwt2
		https://github.com/hapijs/lab
		https://github.com/dwyl/learn-json-web-tokens
    
##  Commands
		set -x NODE_ENV development
		npm run knex -- migrate:make users
		npm run knex -- migrate:latest
		npm install --save bookshelf-uuid
		npm install --save jsonwebtoken
		npmjs.com/package/jsonwebtoken
		docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
		docker exec -it 05b3a3471f6f bash
		root@05b3a3471f6f:/# psql -U postgres
		postgres-# CREATE DATABASE mytest;
		postgres-# \q
		psql -h public-ip-server -p 5432 -U postgres
