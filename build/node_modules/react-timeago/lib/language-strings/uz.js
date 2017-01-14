'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


// Uzbek
var strings = {
  prefixAgo: null,
  prefixFromNow: 'keyin',
  suffixAgo: 'avval',
  suffixFromNow: null,
  seconds: 'bir necha soniya',
  minute: '1 daqiqa',
  minutes: function minutes(value) {
    return '%d daqiqa';
  },
  hour: '1 soat',
  hours: function hours(value) {
    return '%d soat';
  },
  day: '1 kun',
  days: function days(value) {
    return '%d kun';
  },
  month: '1 oy',
  months: function months(value) {
    return '%d oy';
  },
  year: '1 yil',
  years: function years(value) {
    return '%d yil';
  },
  wordSeparator: ' '
};
exports.default = strings;