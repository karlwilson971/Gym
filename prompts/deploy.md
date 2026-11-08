# PulseFit: Deploy prompt

```
DEPLOY PULSEFIT: Put PulseFit live on the internet with Vercel. Keep all the existing design, screens, animations and database exactly as they are. Do not add new features.

IMPORTANT: Never commit .env or paste DATABASE_URL / JWT_SECRET into any code file. They only go in .env (local) and in Vercel's Environment Variables.

1. PRE-FLIGHT CHECK (local)
- Run "npm run build" and fix every error and warning
- Confirm .env is in .gitignore and .env.example has empty values only
- Search the whole frontend for "DATABASE_URL" or "postgres://" and confirm nothing leaks into the browser bundle
- Confirm every /api route file works as a Vercel serverless function (default export handler, no Express-only code)

2. VERCEL SETUP
- Add a vercel.json so:
  - /api/* goes to the serverless functions
  - every other route falls back to index.html (so refreshing /dashboard or /library doesn't show a 404)
- Set build command "npm run build" and output folder "dist"
- Make the login cookie production-safe: httpOnly, Secure, SameSite=Lax, path "/"
- If the Vercel CLI isn't installed, install it. If I need to log in, stop and tell me exactly what to click.

3. GITHUB
- Initialize git if needed and make a clean first commit (no .env, no node_modules, no dist)
- If no GitHub repo exists, tell me exactly how to create one and the 2 commands to push
- Connect the repo to Vercel so every push deploys automatically

4. ENVIRONMENT VARIABLES
- Tell me step by step where to add these in the Vercel dashboard:
  - DATABASE_URL (from Neon, the pooled connection string)
  - JWT_SECRET (the same value as my .env)
- Add them for Production and Preview, then redeploy

5. DEPLOY
- Deploy a Preview first and test it, then promote to Production
- If the build fails, read the Vercel logs, fix it and redeploy until it's green

6. LIVE TEST (on the real URL, not localhost)
- Landing loads with real counters, "PulseFit" in the tab title, and the pulse favicon shows
- Log in with test@pulsefit.com / Test1234!, then add exercises to today's workout, start Live Workout, tick sets, finish (confetti), and check that the dashboard updates
- Refresh on every screen: no 404s
- Log out, then open /dashboard directly: it should send me to login
- Check on my phone width (375px): bottom nav works, no sideways scrolling
- Browser console shows zero errors on every screen

7. REPORT
When finished, show me a simple table:
Check | Pass/Fail | What you fixed
Then tell me in plain English:
- my live website link
- how to deploy updates in future (one command or "just push to GitHub")
- where to see logs in Vercel if something breaks
- anything I should do next (custom domain, analytics, etc.)
```
