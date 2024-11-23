# Spicy Chat

Welcome to the official Spicy Chat website front-end repository! This can be build from anywhere.

## Building This Repository

Building this repo is quite straightforward. You'll need:
- Node (test with `node -v`)
- NPM (usually comes with node)
- React (`npm install react react-router-dom react-dom`)
- Material UI (`npm install @mui/material @mui/icons-material @emotion/react @emotion/styled`)
- This repository in some folder somewhere on your computer.

And now, for the actaully important part, the build steps:

```
npm install
npm run build
```

That's it! Simple, right?

## Publishing The Result

That should be pretty trivial. All you need to do is upload the result to your website and it will automatically work.

### Deploying To Vercel

Vercel can be quite difficult with it's untracable build errors. Hopefully it will build this repo. To do that, go to your [dashboard](https://vercel.com/) on Vercel. Then, click "Add New...", and click "Project". You will need to import this repo. Fork this repo (unless you're me) and import it from your repository list. It should start building the repository.

**IMPORTANT:** You need to set a custom build command as `npm run build` and a custom install command as `npm install`. This will not work without doing this.

### Deploying To Koyeb/Glitch/Railway

The steps are pretty much the same, but you don't need to fork the repo. Just copy & paste this URL: `https://github.com/Spicy-Development/Spicy-Chat` as the import URL.