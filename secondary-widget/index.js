import { align,text_style, createWidget, widget, deleteWidget, setAppWidgetSize, getAppWidgetSize,prop } from "@zos/ui";
import { Time } from '@zos/sensor'
import { px } from "@zos/utils";
import {DEVICE_WIDTH,DEVICE_HEIGHT} from "../page/convertor"

SecondaryWidget({
  state: {
    refreshWidgetList: [],
  },
  build() {  

  },
  onResume() {
    //const { margin } = getAppWidgetSize()
    //const { radius } = getAppWidgetSize()
    //logger.log('the margin value:' + margin + "and radius is :" + radius)
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

switch (SmonthN) {
  case 1:
    imageSrc = 'm_images/m1.png';
    break;
  case 2:
    imageSrc = 'm_images/m2.png';
    break;
  case 3:
    imageSrc = 'm_images/m3.png';
    break;
  case 4:
    imageSrc = 'm_images/m4.png';
    break;
  case 5:
    imageSrc = 'm_images/m5.png';
    break;    
  case 6:
    imageSrc = 'm_images/m6.png';
    break;
  case 7:
    imageSrc = 'm_images/m7.png';
    break;
  case 8:
    imageSrc = 'm_images/m8.png';
    break;
  case 9:
    imageSrc = 'm_images/m9.png';
    break;
  case 10:
    imageSrc = 'm_images/m10.png';
    break;   
  case 11:
    imageSrc = 'm_images/m11.png';
    break;
  case 12:
    imageSrc = 'm_images/m12.png';
    break;
  }
const img = createWidget(widget.IMG)
  img.setProperty(prop.MORE, {
    //pos_x:1,
    //center_x:DEVICE_WIDTH/2,
    x: (DEVICE_WIDTH-300)/2,
    y: px(10),
    w:px(300),
    h:px(150),
    //auto_scale,
    src: imageSrc
  
})
    const text_date =  createWidget( widget.TEXT, {
      x: (DEVICE_WIDTH-300)/2,
      y: px(10),
      w:px(300),
      h:px(150),
      color: 0xffffff,
      text_size: px(40),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style:  text_style.ELLIPSIS,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': Sdate + "    " + SmonthT
      }
    })
    const events = [
      { evdate: "1404/1/1", evtitle: "آغاز نوروز" },
      { evdate: "1404/1/2", evtitle: "شهادت حضرت علی (ع) - عید نوروز" },
      { evdate: "1404/1/3", evtitle: "عید نوروز" },
      { evdate: "1404/1/4", evtitle: "عید نوروز" },
      { evdate: "1404/1/11", evtitle: "عید سعید فطر" },
      { evdate: "1404/1/12", evtitle: "تعطیل به مناسبت عید سعید فطر - روز جمهوری اسلامی ایران" },
      { evdate: "1404/1/13", evtitle: "روز طبیعت" },
      { evdate: "1404/2/4", evtitle: "شهادت امام جعفر صادق (ع)" },
      { evdate: "1404/3/14", evtitle: "رحلت امام خمینی" },
      { evdate: "1404/3/15", evtitle: "قیام خونین ۱۵ خرداد" },
      { evdate: "1404/3/16", evtitle: "عید سعید قربان" },
      { evdate: "1404/3/24", evtitle: "عید سعید غدیر خم" },
      { evdate: "1404/4/14", evtitle: "تاسوعای حسینی" },
      { evdate: "1404/4/15", evtitle: "عاشورای حسینی" },
      { evdate: "1404/5/23", evtitle: "اربعین حسینی" },
      { evdate: "1404/5/31", evtitle: "رحلت حضرت رسول اکرم (ص) - شهادت امام حسن مجتبی (ع)" },
      { evdate: "1404/6/2", evtitle: "شهادت امام رضا (ع)" },
      { evdate: "1404/6/10", evtitle: "شهادت امام حسن عسکری (ع) - آغاز امامت حضرت ولیعصر (عج)" },
      { evdate: "1404/6/19", evtitle: "ولادت حضرت رسول اکرم (ص) - ولادت امام جعفر صادق (ع)" },
      { evdate: "1404/9/3", evtitle: "شهادت حضرت فاطمه زهرا (س)" },
      { evdate: "1404/10/13", evtitle: "ولادت امام علی (ع) - روز پدر" },
      { evdate: "1404/10/27", evtitle: "مبعث حضرت رسول اکرم (ص)" },
      { evdate: "1404/11/15", evtitle: "ولادت حضرت قائم (عج)" },
      { evdate: "1404/11/22", evtitle: "پیروزی انقلاب اسلامی ایران" },
      { evdate: "1404/12/20", evtitle: "شهادت حضرت علی (ع)" },
      { evdate: "1404/12/29", evtitle: "روز ملی شدن صنعت نفت ایران" }
    ];
    
    let todayEvent;
    for (let j=0; j<events.length; j++){
        if (events[j].evdate === Syear+'/'+SmonthN+'/'+Sdate) {
            todayEvent = events[j];
            break;
        }
    }
    let currentevent;
    if (todayEvent){
        currentevent = todayEvent.evtitle;
    }
    else {
        currentevent = 'بدون مناسبت';
    }
    
    const event_date =  createWidget( widget.TEXT, {
      x: 0,
      y: px(160),
      w: DEVICE_WIDTH,
      h: 0.4*DEVICE_HEIGHT,
      color: 0xffffff,
      text_size: px(30),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style:  text_style.WRAP,
      font: 'fonts/LMU HOMA.TTF',
      text_i18n : {
        'en-US': currentevent
      }
    })

    const circle = createWidget(widget.CIRCLE, {
      center_x: DEVICE_WIDTH/2,
      center_y: DEVICE_HEIGHT,
      radius: DEVICE_WIDTH/4,
      color: 0x545454,
      alpha: 200
    })

    const yearshow =  createWidget( widget.TEXT, {
      x: 0,
      y: DEVICE_HEIGHT-DEVICE_WIDTH/4.5,
      w: DEVICE_WIDTH,
      h: DEVICE_WIDTH/4,
      color: 0xffffff,
      text_size: px(40),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style:  text_style.ELLIPSIS,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': Syear
      }
    })

    this.state.refreshWidgetList.push(text_date,img,event_date,yearshow);
  }
});     
      