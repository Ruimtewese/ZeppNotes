import * as hmUI from "@zos/ui";
import { createKeyboard, deleteKeyboard, inputType } from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { LocalStorage } from "@zos/storage";
import { replace } from "@zos/router";
import { DEVICE_WIDTH } from "../utils/config/device";

const NOTES_KEY = "quick_notes";

const localStorage = new LocalStorage();

let noteText = "";

Page(
  BasePage({
    state: {},

    build() {
      // Remove status bar
      hmUI.setStatusBarVisible(false);

      // Get selected note index
      const index = Number(this.request?.params?.index ?? 0);

      // Load notes
      const notes = localStorage.getItem(NOTES_KEY, []);

      if (!Array.isArray(notes) || !notes[index]) {
        console.log("Note not found");

        replace({
          url: "page/index",
        });

        return;
      }

      this.noteIndex = index;
      noteText = notes[index].text || "";

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
        text: "Note",
        text_size: px(36),
        color: 0xffffff,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
      });

      // Note card
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: px(30),
        y: px(95),
        w: DEVICE_WIDTH - px(60),
        h: px(190),
        color: 0x181818,
        radius: px(24),
      });

      // Note text
      this.noteTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(50),
        y: px(115),
        w: DEVICE_WIDTH - px(100),
        h: px(150),
        text: noteText,
        text_size: px(26),
        color: 0xffffff,
        align_h: hmUI.align.LEFT,
        align_v: hmUI.align.TOP,
        text_style: hmUI.text_style.WRAP,
      });

      // EDIT button
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: px(30),
        y: px(310),
        w: px(DEVICE_WIDTH / 2 - 40),
        h: px(60),
        text: "EDIT",
        text_size: px(25),
        radius: px(30),
        normal_color: 0x9bd8a5,
        press_color: 0x78b982,
        text_color: 0x000000,

        click_func: () => {
          this.openKeyboard();
        },
      });

      // DELETE button
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: px(DEVICE_WIDTH / 2 + 10),
        y: px(310),
        w: px(DEVICE_WIDTH / 2 - 40),
        h: px(60),
        text: "DELETE",
        text_size: px(23),
        radius: px(30),
        normal_color: 0x252525,
        press_color: 0x383838,
        text_color: 0xffffff,

        click_func: () => {
          this.deleteNote();
        },
      });

      // BACK button
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: px(50),
        y: px(390),
        w: DEVICE_WIDTH - px(100),
        h: px(60),
        text: "BACK",
        text_size: px(24),
        radius: px(30),
        normal_color: 0x181818,
        press_color: 0x282828,
        text_color: 0xffffff,

        click_func: () => {
          replace({
            url: "page/index",
          });
        },
      });
    },

    openKeyboard() {
      createKeyboard({
        inputType: inputType.VOICE,

        text: noteText,

        onComplete: (_, result) => {
          noteText = result.data || "";

          this.noteTextWidget.setProperty(
            hmUI.prop.TEXT,
            noteText
          );

          this.saveEditedNote();
        },

        onCancel: () => {
          deleteKeyboard();
        },
      });
    },

    saveEditedNote() {
      let notes = localStorage.getItem(NOTES_KEY, []);

      if (!Array.isArray(notes) || !notes[this.noteIndex]) {
        return;
      }

      notes[this.noteIndex].text = noteText;

      localStorage.setItem(NOTES_KEY, notes);

      console.log("Note updated:", noteText);

      deleteKeyboard();
    },

    deleteNote() {
      let notes = localStorage.getItem(NOTES_KEY, []);

      if (!Array.isArray(notes) || !notes[this.noteIndex]) {
        return;
      }

      notes.splice(this.noteIndex, 1);

      localStorage.setItem(NOTES_KEY, notes);

      console.log("Note deleted");

      // Replace current page with home page
      replace({
        url: "page/index",
      });
    },
  })
);