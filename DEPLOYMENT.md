# Deployment Guide for KyroFit

This guide outlines the steps to deploy the KyroFit application to a live environment.

## Prerequisites

- **GitHub Account**: To host your code repository.
- **Vercel Account**: For the easiest and most optimized deployment (Recommended).
- **Database**: A production Postgres database (e.g., Neon, Supabase, or self-hosted).

## Option 1: Deploying to Vercel (Recommended)

Vercel is the creators of Next.js and offers the best integration.

### Steps:

1.  **Push to GitHub**:
    - Ensure your latest code is pushed to a GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deploy"
    git push origin main
    ```

2.  **Import Project in Vercel**:
    - Go to [vercel.com/new](https://vercel.com/new).
    - Select your GitHub repository `arisestyle-fitness`.
    - Click **Import**.

3.  **Configure Environment Variables**:
    - In the "Environment Variables" section, add the following (copy from your `.env` but use PRODUCTION values):
        - `DATABASE_URL`: Your production database connection string.
        - `AUTH_SECRET`: Generate a new secure secret (run `openssl rand -base64 32` in terminal to generate one).
        - `NEXTAUTH_URL`: Your production URL (e.g., `https://kyrofit.vercel.app`).
        - `NODE_ENV`: `production`

4.  **Deploy**:
    - Click **Deploy**. Vercel will build your app and assign a domain.

5.  **Post-Deploy**:
    - Once deployed, go to the dashboard URL.
    - If you are using Prisma, you might need to run migrations against your production DB.
    - Connect to your production DB locally or use Vercel's build command override to include `npx prisma migrate deploy`.

## Option 2: Build for Production Locally

If you want to test the production build on your machine:

1.  **Build**:
    ```bash
    npm run build
    ```
    This creates an optimized production build in the `.next` folder.

2.  **Start**:
    ```bash
    npm start
    ```
    This runs the production server at `http://localhost:3000`.

## PWA Verification

After deployment:
1.  Open the site on Safari on your iPhone.
2.  Tap the **Share** button.
3.  Tap **Add to Home Screen**.
4.  Verify the icon appears and the app opens in standalone mode (no browser address bar).

## Updating Your App

Yes! Making changes after the app is live is simple and seamless.

1.  **Make Changes**: Edit your code locally on your computer.
2.  **Test**: Verify everything works by running `npm run dev`.
3.  **Deploy Updates**:
    - **If using Vercel**: Simply push your changes to GitHub.
      ```bash
      git add .
      git commit -m "Description of changes"
      git push origin main
      ```
      Vercel will detect the new commit, automatically build the new version, and redeploy it without any downtime.
    - **If Manual**: Pull the latest code on your server, rebuild (`npm run build`), and restart the server.

