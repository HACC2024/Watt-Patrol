import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import lightbulbMessageAudio from '../../assets/json/lightbulb-messages-audio.json';

interface MessageItem {
  msg: string;
  file: string;
  audio?: HTMLAudioElement;
}

interface LightbulbMessageAudio {
  [key: string]: MessageItem[];
}

@Component({
  selector: 'app-lightbulb',
  templateUrl: './lightbulb.component.html',
  styleUrls: ['./lightbulb.component.scss']
})
export class LightbulbComponent implements OnInit, OnChanges {

  private delayTime = 1 * 1000; // Delay for message.

  @Input() itemToggled: any;
  showMsg: boolean = false;

  private lightbulbMessageAudio: LightbulbMessageAudio = lightbulbMessageAudio;
  private triggerWarningNext: Boolean = false;

  msg = '';

  private audioQueue: HTMLAudioElement[] = [];  // Queue to manage audio playback.

  ngOnChanges(): void {
    if (this.lightbulbMessageAudio[this.itemToggled.name]) {
      this.showApplianceMsg();
    }
  }

  ngOnInit(): void {
    this.preloadSpeechBubble();
    this.preloadAudio();
    this.cycleIdleMsg();
  }

  /* Ensures speech bubble image is loaded when showing message. */
  preloadSpeechBubble() {
    const img = new Image();
    img.src = 'assets/images/lightbulb/speech-bubble.png';
  }

  preloadAudio() {
    for (const appliance in lightbulbMessageAudio) {
      for (const message in this.lightbulbMessageAudio[appliance]) {
        const audio = new Audio();
        audio.src = `assets/audio/lightbulb/${this.lightbulbMessageAudio[appliance][message]['file']}`;
        audio.preload = 'auto';
        this.lightbulbMessageAudio[appliance][message]['audio'] = audio;
      }
    }
  }

  triggerWarningMsg() {
    this.triggerWarningNext = true;
    if (!this.showMsg) {
      this.playWarningMsg();
    } 
  }


  playWarningMsg() {
    const warningMsg = this.lightbulbMessageAudio['warning'][0];
    this.msg = warningMsg.msg;  // Set the message text
    this.showMsg = true;  // Show the message
    warningMsg.audio?.play();
    warningMsg.audio?.addEventListener('ended', () => {
      this.triggerWarningNext = false;
      setTimeout(() => {
        this.showMsg = false;  // Hide the message after the duration
      }, this.delayTime);
    });
  }

  showApplianceMsg() {
    const itemMessagesAudios = this.lightbulbMessageAudio[this.itemToggled.name];

    if (!this.showMsg) {
      const select = Math.floor(Math.random() * itemMessagesAudios.length);
      this.msg = itemMessagesAudios[select].msg;  // Set the message text
      this.showMsg = true;  // Show the message
      itemMessagesAudios[select].audio?.play();
      itemMessagesAudios[select].audio?.addEventListener('ended', () => {
        setTimeout(() => {
          this.showMsg = false;  // Hide the message after the duration
        }, this.delayTime);

        if (this.triggerWarningNext) this.playWarningMsg();  
      });
    }
  }

  showIdleMsg() {
    const idleMessages = this.lightbulbMessageAudio['idle'];
    const select = Math.floor(Math.random() * idleMessages.length);

    if (!this.showMsg) {
      this.msg = idleMessages[select].msg;  // Set the message text
      this.showMsg = true;  // Show the message
      idleMessages[select].audio?.play();
      idleMessages[select].audio?.addEventListener('ended', () => {
        setTimeout(() => {
          this.showMsg = false;  // Hide the message after the duration
        }, this.delayTime);
      });
    }
  }

  cycleIdleMsg() {
    const timeCycle = 1 * 1000;
    const timeToShow = 60;  // Idle message shows after timeToShow seconds
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
