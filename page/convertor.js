import { getDeviceInfo } from '@zos/device'
import { Time } from '@zos/sensor'
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
function gregorianToJalali(gy, gm, gd) {
  var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var jy, jm, jd;
  var gy2 = (gm > 2) ? (gy + 1) : gy;
  var days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy = -1595 + (33 * Math.floor(days / 12053));
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
  }
  if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
  } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
  }
  return { jYear: jy, jMonth: jm, jDay: jd };
}

function getPersianDate() {
  var now = new Time();
  var gy = now.getFullYear();
  var gm = now.getMonth() ; // getMonth() returns month from 0 to 11
  var gd = now.getDate();
  
  var persianDate = gregorianToJalali(gy, gm, gd);
  
  console.log("Jalali Year: " + persianDate.jYear);
  console.log("Jalali Month: " + persianDate.jMonth);
  console.log("Jalali Day: " + persianDate.jDay);
  
  return persianDate;
}

var persianDate = getPersianDate();
var Syear = persianDate.jYear;
var SmonthN = persianDate.jMonth;
var Sdate = persianDate.jDay;
var Eday = new Time().getDay();
switch (Eday) {
  case 1:
    var Sday = "دوشنبه";
    break;
  case 2:
    var Sday = "سه شنبه";
    break;
  case 3:
    var Sday = "چهارشنبه";
    break;
  case 4:
    var Sday = "پنجشنبه";
    break;
  case 5:
    var Sday = "جمعه";
    break;
  case 6:
    var Sday = "شنبه";
    break;
  case 7:
    var Sday = "یکشنبه";
    break;
}
switch (SmonthN) {
  case 1:
      var SmonthT = "فروردين";
    break;
  case 2:
      var SmonthT = "ارديبهشت";
    break;
  case 3:
        var SmonthT = "خرداد";
    break;
  case 4:
      var SmonthT = "تير";
    break;
  case 5:
      var SmonthT = "مرداد";
    break;
  case 6:
      var SmonthT = "شهريور";
    break;
  case 7:
      var SmonthT = "مهر";
    break;
  case 8:
      var SmonthT = "آبان";
    break;
  case 9:
      var SmonthT = "آذر";
    break;
  case 10:
      var SmonthT = "دی";
    break;
  case 11:
      var SmonthT = "بهمن";
    break;
  case 12:
      var SmonthT = "اسفند";
    break;
}
export var Syear,SmonthN, SmonthT,Sdate, Sday;