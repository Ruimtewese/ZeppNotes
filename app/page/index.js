import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";

import {
  TITLE,
  NEW_NOTE_BUTTON,
  EMPTY_TEXT,
} from "zosLoader:./index.[pf].layout.js";

Page(
  BasePage({
    state: {
      notes: [],
    },

    build() {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 480,
        h: 480,
        color: 0x000000,
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        ...TITLE,
        text: "Quick Notes",
      });

      hmUI.createWidget(hmUI.widget.BUTTON, {
        ...NEW_NOTE_BUTTON,
        click_func: () => {
          console.log("New note pressed");
        },
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        ...EMPTY_TEXT,
        text: "No notes yet",
      });
    },
  })
);