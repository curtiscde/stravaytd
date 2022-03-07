# Strava Year-To-Date Stats

[![App CI](https://github.com/curtiscde/stravaytd/actions/workflows/ci-app.yml/badge.svg)](https://github.com/curtiscde/stravaytd/actions/workflows/ci-app.yml) [![Actions CI](https://github.com/curtiscde/stravaytd/actions/workflows/ci-actions.yml/badge.svg)](https://github.com/curtiscde/stravaytd/actions/workflows/ci-actions.yml) [![Update YTD History](https://github.com/curtiscde/stravaytd/actions/workflows/update-ytd-history.yml/badge.svg)](https://github.com/curtiscde/stravaytd/actions/workflows/update-ytd-history.yml) [![codecov](https://codecov.io/gh/curtiscde/stravaytd/branch/main/graph/badge.svg?token=AWEBPKHI2B)](https://codecov.io/gh/curtiscde/stravaytd) [![Netlify Status](https://api.netlify.com/api/v1/badges/e1fb843a-952b-425a-a463-5bcdde5581e0/deploy-status)](https://app.netlify.com/sites/stravaytd/deploys)

 - 🌐 https://stravaytd.curtiscode.dev
 - 📝 https://www.curtiscode.dev/post/project/displaying-strava-stats-using-webhooks

![](https://www.curtiscode.dev/images/post/stravaytd/screenshot.png)

## Environment Variables

| Key                    | Description |
|------------------------|-------------|
| ALLOWED_ATHLETES       | Comma-separated list of Strava users which will be displayed (e.g `123,456`). Optionally, a display name can also be shown for each user by appending `:` followed by their name (e.g `123:foo,456:bar`)         | 
| CIPHERKEY              | An alphanumberic value with a length of 32. This is used for the encryption of the user refresh tokens in Firestore            |
| firebaseServiceAccount | Firebase JSON Service Account details. [See more details](https://firebase.google.com/docs/app-distribution/authenticate-service-account.md?platform=android).            |
| GITHUB_REF             | The default GitHub repository branch (e.g `main`)            |
| GITHUB_REPO            | The GitHub username and repository (e.g. `<github-username>/<repo-name>`)            |
| GITHUB_PAT             | A GitHub Personal Access [See more details](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)            |
| STRAVA_CLIENTID        | Your Strava Client ID            |
| STRAVA_CLIENTSECRET    | Your Strava Client Secret            |
| STRAVA_VERIFY_TOKEN    | Alphanumeric value used to verify the creation of a new Strava webhook subscription            |