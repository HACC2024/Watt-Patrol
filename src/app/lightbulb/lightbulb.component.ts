import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as lightbulbMessageAudio from './lightbulb-messages-audio.json';

interface MessageItem {
    msg: string;
    file: string;
}

interface LightbulbMessageAudio {
  [key: string]: MessageItem[];
}

@Component({
  selector: 'app-lightbulb',
  templateUrl: './lightbulb.component.html',
  styleUrl: './lightbulb.component.scss'
})
export class LightbulbComponent implements OnInit, OnChanges {
  @Input() itemToggled: any;

  showMsg: boolean = false;

  private lightbulbMessageAudio: LightbulbMessageAudio = (lightbulbMessageAudio as any).default;

  msg = '';

  ngOnChanges(): void {
    // console.log("Testing", lightbulbMessageAudio)
    if (this.lightbulbMessageAudio[this.itemToggled.name]) this.showApplianceMsg();
  }

  ngOnInit(): void {
    this.preloadSpeechBubble();
    this.cycleIdleMsg();
  }

  /* Ensures speech bubble image is loaded when showing message. */
  preloadSpeechBubble() {
    const img = new Image();
    img.src = 'assets/images/lightbulb/speech-bubble.png';
  }

  showApplianceMsg() {
    const itemMessagesAudios = this.lightbulbMessageAudio[this.itemToggled.name];
    const appearTime = 10 * 1000;  // Changes how many seconds the message appears for.

    /* Only change message if not currently showing. */
    if (!this.showMsg) {
      const select = Math.floor(Math.random() * itemMessagesAudios.length);
      this.msg = itemMessagesAudios[select].msg;
      this.showMsg = true;

      setTimeout(() => {
        this.showMsg = false;
      }, appearTime)
    }
  }

  showIdleMsg() {
    const appearTime = 10 * 1000;  // Changes how many seconds the message appears for.
    const idleMessages = this.lightbulbMessageAudio['idle'];
    const select = Math.floor(Math.random() * idleMessages.length);

    /* Only change message if not currently showing. */
    if (!this.showMsg) {
      this.msg = idleMessages[select].msg;
      this.showMsg = true;

      setTimeout(() => {
        this.showMsg = false;
      }, appearTime)
    }
  }

  cycleIdleMsg() {
    const timeCycle = 1 * 1000; 
    const timeToShow = 30;  // Idle message shows after timeToShow seconds
    var timer = 0;

    setInterval(() => {
      if (!this.showMsg) {
        timer++;        
      } else {
        timer = 0;
      }

      if (timer >= timeToShow) {
        this.showIdleMsg();
      }
    }, timeCycle); // Cycle every 1 second
  }

}
