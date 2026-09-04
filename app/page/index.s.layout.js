import * as hmUI from "@zos/ui";
import { px } from "@zos/utils";
import { DEVICE_WIDTH } from "../utils/config/device";

export const TITLE = {
  x: px(30),
  y: px(35),
  w: DEVICE_WIDTH - px(60),
  h: px(55),
  color: 0xffffff,
  text_size: px(38),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
};

export const NEW_NOTE_BUTTON = {
  x: px(40),
  y: px(110),
  w: DEVICE_WIDTH - px(80),
  h: px(70),
  text: "+  NEW NOTE",
  text_size: px(28),
  radius: px(14),
  normal_color: 0x202020,
  press_color: 0x404040,
};

export const EMPTY_TEXT = {
  x: px(40),
  y: px(215),
  w: DEVICE_WIDTH - px(80),
  h: px(50),
  color: 0x888888,
  text_size: px(26),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
};