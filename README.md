# elementalist

A browser game where you control an elementalist. 

## Running the app locally

```
npm run dev
```
Navigate to localhost:8080 in a browser. 
Hot loading is currently turned off; code changes will require you to reload the browser window.

## Deploying the app

I'm currently testing out deployment on both Github Pages and Heroku. 
Still not sure which method I'm going to use.
Since it's just a static page for now, Github Pages might be most applicable. 

### Github Pages

```
npm run deploy-github
```
This does a fresh build and pushes the `/dist` directory to the `gh-pages` branch
(which we host our Github Pages site from).

App can be viewed at [https://robkiessling.github.io/elementalist/](https://robkiessling.github.io/elementalist/).

Code relevant to github deployment:
- `gh-pages` package
- `gh-pages` git branch
- `deploy-github` script

### Heroku

```
git commit -am "my commit message"
git push heroku main
```

App can be viewed at [https://elementalist.herokuapp.com/](https://elementalist.herokuapp.com/).

Code relevant to Heroku deployment:
- `express` package
- `server.cjs` file
- `start` script
- `heroku-postbuild` script
- `Procfile`