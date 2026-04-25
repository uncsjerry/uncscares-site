# Deployment

## Hosting

- **Platform:** Vercel
- **Auto-deploy:** Pushes to `main` trigger production deploys
- **Preview:** Every PR gets a Vercel preview deployment with unique URL
- **Domain:** uncscares.org

## Branch Strategy

1. Create feature branch from `main`
2. Make changes, commit
3. Open PR — Vercel creates preview deploy
4. Squash merge to `main` via PR (requires CI pass)
5. Vercel auto-deploys to production

## Build

```bash
npm run build    # next build — static generation + dynamic API routes
npm run dev      # next dev — local development server
npm run lint     # eslint
```

## Vercel Team Note

The UNCS Vercel team enforces commit-author email membership. Use `jgutierrez@uncs.com` as the git identity or deploys will silently fail pre-build.

## Git Identity

Single canonical commit identity for all repos:
```
git config --global user.email "jgutierrez@uncs.com"
```
