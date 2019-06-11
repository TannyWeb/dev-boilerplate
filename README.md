# CRO Dev Boilerplate
## A boilerplate built for CRO

A project containg the blueprint for a test setup with helpers such as the Icarus library.

### Usage 

Clone this repo and copy the contents of the cloned cro-dev-boilerplate folder and paste the files into your test folder to use. Key files to make sure you’ve copied over are:

- Whole src folder
- .gitignore (tells Bitbucket which files we don’t want to commit/push)
- Babel.config.js (Babel is a compiler for ES2015. It takes JavaScript that may be un-supported and turns it into browser friendly JS)
- package.json (This is the holy grail for everything to work. This file tells npm which dependencies to download and sets the commands for Webpack)
- package-lock.json (Locks the dependencies into specific working versions)
- postcss.config.js (The config for the PostCSS module used in Webpack)
- webpack.config.js (The config which tells webpack what to do)

Once you’ve copied over all the files, cd into your test folder directory and run `npm install`. This should install all the packages and dependencies needed for your project.

After that you can edit the code as you please. 

### Compile

For your JS & SASS/CSS to compile in real time you can run the following:
 ```console
 $ npm run dev
 ``` 
 
To get the production code, run this instead:
  ```console
 $ npm run prod
 ``` 

 These should both output to a `dist` folder and you can copy your code from there to paste into VWO/Optimize etc.