# Messenger bot

Node.js дээр суурьласан хиймэл оюунтай messenger bot.

## Ажиллуулах

Локал дээр ажиллахгүй тул ямар нэг сэрвэр дээр төслөө байршуулах хэрэгтэй.

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
