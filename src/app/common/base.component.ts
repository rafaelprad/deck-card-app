import { NgZone, ChangeDetectorRef } from '@angular/core';

export class BaseComponent {

  constructor(
    protected zone: NgZone,
    protected changeDetectorRef: ChangeDetectorRef) {

  }

  keyRestrictOnlyNumber(event: KeyboardEvent) {
    let keycode = 0;
    if (window.event) {
      keycode = event.keyCode; // IE
    } else {
      keycode = event.which; // Firefox
    }

    if ((keycode > 47 && keycode < 58) ||
      event.code === "Login" || event.code === "End" ||
      event.code === "Delete" ||
      event.code === "ArrowLeft" || event.code === "ArrowRight" ||
      event.code === "Numpad0" || event.code === "Numpad1" ||
      event.code === "Numpad2" || event.code === "Numpad3" ||
      event.code === "Numpad4" || event.code === "Numpad5" ||
      event.code === "Numpad6" || event.code === "Numpad7" ||
      event.code === "Numpad8" || event.code === "Numpad9" ||
      keycode === 8 || keycode === 9 || keycode === 127 ||
      (event.ctrlKey && (event.key === 'C' || event.key === 'c' || event.key === 'V' || event.key === 'v'))) {
      return true;
    } else {
      return false;
    }
  }

  keyRestrictCharWithNumber(event: KeyboardEvent, staCanUseSpace: boolean = false) {
    let keycode = 0;
    if (window.event) {
      keycode = event.keyCode; // IE
    } else {
      keycode = event.which; // Firefox
    }

    if ((keycode > 47 && keycode < 58) ||
      (keycode > 63 && keycode < 91) ||
      (keycode > 96 && keycode < 123) ||
      event.code === "Login" || event.code === "End" ||
      event.code === "Delete" ||
      event.code === "ArrowLeft" || event.code === "ArrowRight" ||
      event.code === "Numpad0" || event.code === "Numpad1" ||
      event.code === "Numpad2" || event.code === "Numpad3" ||
      event.code === "Numpad4" || event.code === "Numpad5" ||
      event.code === "Numpad6" || event.code === "Numpad7" ||
      event.code === "Numpad8" || event.code === "Numpad9" ||
      keycode === 8 || keycode === 9 || keycode === 127 ||
      event.key === '-' || event.key === '.' ||
      (staCanUseSpace === true && keycode === 32) ||
      (event.key === 'Ç' || event.key === 'ç' || event.key === '@' || event.key === '_' || event.key === '-') ||
      (event.ctrlKey && (event.key === 'C' || event.key === 'c' || event.key === 'V' || event.key === 'v'))) {
      return true;
    } else {
      return false;
    }
  }

  // Force redraw
  render(): void {
    if (this.zone) {
      this.zone.run(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
