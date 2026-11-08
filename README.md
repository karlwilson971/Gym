# PulseFit

## Neon database

The Vercel API function at `/api/state` stores the app's existing workout and class-booking state in Neon. The browser continues to use local storage as an offline fallback. The table definition is in `db/schema.sql`.

1. Create a Neon project and copy its pooled PostgreSQL connection string from **Connect**.
2. Run `db/schema.sql` in the Neon SQL Editor to create the state table.
3. Set `DATABASE_URL` to that connection string in your local environment and in Vercel **Settings → Environment Variables** for Preview and Production. Do not prefix it with `VITE_` or expose it to client code.
4. Install dependencies with `npm install`, then run `npm run dev`. Deploy to Vercel to use the database-backed API.

If `DATABASE_URL` is unset or the API is unavailable, the app continues to work with browser-local storage.

**Access model:** this demo currently has no user authentication. State is keyed by a random browser ID, which separates browsers but is not an account or a security boundary. Add authentication and authorization before storing private user data or using this API for a public production service.
