# Messenger bot

Node.js болон React.js дээр суурьласан ухаалаг messenger bot.

## Ажиллуулах

Локал дээр ажиллахгүй тул ямар нэг сэрвэр дээр төслөө байршуулах хэрэгтэй.

## Ашигласан технологиуд
- axios
- babel
- express
- bcryptjs
- mongoose
- react
- react-router
- react-addons-css-transition-group
- react-addons-update
- redux
- redux-thunk
- materializecss
- react-hot-loader
- webpack
- webpack-dev-server
- style-loader
- css-loader


## Шаардлага
MongoDB болон NodeJS суулгасан байх

```
npm install -g webpack babel nodemon cross-env
npm install
```

## Script-үүд

- `npm run clean` 
- `npm run build` 
- `npm run start` 
- `npm run development` 
- `rm -rf build public/bundle.js`
- `babel server --out-dir build --presets=es2015 && webpack`
- `cross-env NODE_ENV=production node ./build/index.js`
- `cross-env NODE_ENV=development nodemon --exec babel-node --presets=es2015 ./server/index.js --watch server`
