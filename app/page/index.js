import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { push } from "@zos/router";
import { LocalStorage } from "@zos/storage";
import { px } from "@zos/utils";
import { DEVICE_WIDTH } from "../utils/config/device";

const NOTES_KEY = "quick_notes";

const localStorage = new LocalStorage();

Page(
  BasePage({
    state: {
      notes: [],
    },

    build() {
      // Remove status bar
      hmUI.setStatusBarVisible(false);

      // Background
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        h: DEVICE_WIDTH,
        color: 0x000000,
      });

      // Title
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(30),
        y: px(25),
        w: DEVICE_WIDTH - px(60),
        h: px(55),
        text: "Quick Notes",
        text_size: px(36),
        color: 0xffffff,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
      });

      // New Note button
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: px(40),
        y: px(90),
        w: DEVICE_WIDTH - px(80),
        h: px(65),
        text: "+  NEW NOTE",
        text_size: px(26),
        radius: px(32),
        normal_color: 0x9bd8a5,
        press_color: 0x78b982,
        text_color: 0x000000,

        click_func: () => {
          push({
            url: "page/note",
          });
        },
      });

      // Load saved notes
      const savedNotes = localStorage.getItem(NOTES_KEY, []);

      if (Array.isArray(savedNotes) && savedNotes.length > 0) {
        this.state.notes = savedNotes;
        this.showNotes(savedNotes);
      } else {
        // Empty state
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: px(40),
          y: px(190),
          w: DEVICE_WIDTH - px(80),
          h: px(50),
          text: "No notes yet",
          text_size: px(26),
          color: 0x777777,
          align_h: hmUI.align.CENTER_H,
          align_v: hmUI.align.CENTER_V,
        });
      }
    },

    showNotes(notes) {
      let y = 175;

      // Newest first
      const reversedNotes = [...notes].reverse();

      reversedNotes.forEach((note, index) => {
        const originalIndex = notes.length - 1 - index;

        // Note card
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: px(30),
          y: px(y),
          w: DEVICE_WIDTH - px(60),
          h: px(75),
          text: note.text,
          text_size: px(23),
          radius: px(20),
          normal_color: 0x181818,
          press_color: 0x282828,
          text_color: 0xffffff,
          color: 0xffffff,
          text_style: hmUI.text_style.ELLIPSIS,

          click_func: () => {
            push({
              url: "page/view-note",
              params: {
                index: originalIndex,
              },
            });
          },
        });

        y += 88;

        // Don't create cards below the visible area
        if (y > DEVICE_WIDTH - 70) {
          return;
        }
      });
    },
  })
);