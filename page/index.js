import {Syear, SmonthT,Sdate, Sday} from "../page/convertor";
import * as hmUI from "@zos/ui";
import {DEVICE_WIDTH,DEVICE_HEIGHT} from "../page/convertor"
Page({
  build() {
    const text_day = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0.1*DEVICE_HEIGHT,
      w: DEVICE_WIDTH,
      h: 0.25*DEVICE_HEIGHT,
      color: 0x1ea5ff,
      text_size: 56,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.BOTTOM,
      text_style: hmUI.text_style.NONE,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': Sday,
      }
    })

    const text_date = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0.35*DEVICE_HEIGHT,
      w: DEVICE_WIDTH,
      h: 0.65*DEVICE_HEIGHT/3,
      color: 0xffffff,
      text_size: 50,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.BOTTOM,
      text_style: hmUI.text_style.ELLIPSIS,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': Sdate
      }
    })
    const text_month = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0.35*DEVICE_HEIGHT+0.65*DEVICE_HEIGHT/3,
      w: DEVICE_WIDTH,
      h: 0.65*DEVICE_HEIGHT/3,
      color: 0xffffff,
      text_size: 50,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.ELLIPSIS,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': SmonthT
      }
    })
    const text_year = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0.35*DEVICE_HEIGHT+2*0.65*DEVICE_HEIGHT/3,
      w: DEVICE_WIDTH,
      h: 0.65*DEVICE_HEIGHT/3,
      color: 0xffffff,
      text_size: 50,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_Vz,
      text_style: hmUI.text_style.ELLIPSIS,
      font: 'fonts/dima.ttf',
      text_i18n : {
        'en-US': Syear
      }
    })

  },
  onReady() {},

  onShow() {},

  onHide() {},

  onDestroy() {},
  
  
})
