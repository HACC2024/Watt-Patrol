import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lightbulb',
  templateUrl: './lightbulb.component.html',
  styleUrl: './lightbulb.component.scss'
})
export class LightbulbComponent implements OnInit {

  showMsg: boolean = false;

  info = {
    start: "Starting message",
    info1: "Information 1",
  };

  funFacts = [
    "Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun Fun fact 1",
    "Fun fact 2",
    "Fun fact 3"
  ];

  // msg = this.info.start;
  msg = this.funFacts[0];

  ngOnInit(): void {
    this.preloadSpeechBubble();
    this.cycleIdleMsg();
  }

  /* Ensures speech bubble image is loaded when showing message. */
  preloadSpeechBubble() {
    const img = new Image();
    img.src = 'assets/images/lightbulb/speech-bubble.png';
  }

  cycleIdleMsg() {
    const timeCycle = 10 * 1000;
    const timeBreak = 3 * 1000;

    setInterval(() => {
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, timeBreak); // Text will disappear after 2 seconds
    }, timeCycle); // Cycle every 5 seconds (3s visible + 2s hidden)
  }

}
