### Start the server
```
npm run dev
```
### Start the DB
```
npm run db-init
```
### Execute DB SQL
```
docker exec -it db psql -U nike -d test -c 'SELECT * FROM "User"'
```