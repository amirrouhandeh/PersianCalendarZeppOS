import { align,text_style, createWidget, widget, deleteWidget, setAppWidgetSize, getAppWidgetSize } from "@zos/ui";
import { Time } from '@zos/sensor'
import { px } from "@zos/utils";
import {DEVICE_WIDTH} from "../page/convertor"
AppWidget({
  state: {
    refreshWidgetList: [],
  },
  onInit() {
    //logger.log("===onInit===");
  },
  onDataRestore() {},
  build() {  

  },
  onResume() {
    //const { margin } = getAppWidgetSize()
    //const { radius } = getAppWidgetSize()
    //logger.log('the margin value:' + margin + "and radius is :" + radius)
    setAppWidgetSize({
      h: px(120)
    })
    setTimeout(() => {
      console.log('Hello Zepp OS',getAppWidgetSize())
    }, 1000)
    try {
      if (this.state.refreshWidgetList.length) {
        this.state.refreshWidgetList.forEach((i) => {
          deleteWidget(i);
        });
        this.state.refreshWidgetList = [];
      }
  
      this.getData();
      //logger.log("===onResume===");
    } catch(e) {
      console.log('LifeCycle Error', e)
      e && e.stack && e.stack.split(/\n/).forEach((i) => console.log('error stack', i))
    }
  },
  getData() {
    const time = new Time(); // Math.floor(Math.random() * 1000)

    this.buildTopContent(time);
  },
  buildTopContent(time) {
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
      var gm = now.getMonth(); // getMonth() returns month from 0 to 11
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
    const text_date =  createWidget( widget.TEXT, {
      x: 0,
      y: px(60),
      w: DEVICE_WIDTH,
      h: px(60),
      color: 0xffffff,
      text_size: px(36),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style:  text_style.ELLIPSIS,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': Sdate + "    " + SmonthT + "    " + Syear
      }
    })
    const text_day =  createWidget( widget.TEXT, {
      x: 0,
      y: px(5),
      w: DEVICE_WIDTH,
      h: px(60),
      color: 0x1ea5ff,
      text_size: px(50),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.ELLIPSIS,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': Sday
      }
      
    })
    this.state.refreshWidgetList.push(text_date, text_day);
  }
});     
      