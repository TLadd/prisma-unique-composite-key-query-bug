To reproduce the bug:

- yarn
- psql -U user -h 127.0.0.1 -d db -f seed.sql
- npx prisma generate
- npx ts-node --transpile-only ./testQuery.ts

Observe logged queries.
