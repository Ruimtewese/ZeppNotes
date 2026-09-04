import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";

Page(
  BasePage({
    state: {},

    build() {
      // Background
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 480,
        h: 480,
        color: 0x000000,
      });

      // Header
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 30,
        y: 30,
        w: 420,
        h: 55,
        text: "New Note",
        text_size: 36,
        color: 0xffffff,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
      });

      // Note input area
      hmUI.createWidget(hmUI.widget.TEXT_INPUT, {
        x: 30,
        y: 105,
        w: 420,
        h: 190,
        text_size: 28,
        color: 0xffffff,
        cursor_color: 0x9BD8A5,
        bg_color: 0x151515,
        radius: 24,
        text: "",
        hint_text: "Start typing...",
        hint_color: 0x777777,
      });

      // Save button
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 50,
        y: 330,
        w: 380,
        h: 70,
        text: "SAVE",
        text_size: 28,
        radius: 35,
        normal_color: 0x9BD8A5,
        press_color: 0x78B982,
        text_color: 0x000000,

        click_func: () => {
          console.log("Save note");
        },
      });
    },
  })
);