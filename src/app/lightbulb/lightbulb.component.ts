import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lightbulb',
  templateUrl: './lightbulb.component.html',
  styleUrl: './lightbulb.component.scss'
})
export class LightbulbComponent implements OnInit, OnChanges {
  @Input() itemToggled: any;

  showMsg: boolean = false;

  info = {
    'ac': [
      'Air conditioning unit for cooling indoor spaces.',
      'Energy-efficient models can help reduce electricity bills.'
    ],
    'dryer': [
      'Electric or gas-powered appliance for drying clothes.',
      'Ensure lint filter is cleaned regularly for safety.'
    ],
    'ceiling-fan': [
      'Helps circulate air and keep rooms cool.',
      'Ceiling fans can be an energy-efficient cooling option.'
    ],
    'refrigerator': [
      'Essential appliance for preserving food.',
      'Check temperature settings for optimal food storage.'
    ],
    'light': [
      'Provides illumination for indoor spaces.',
      'Use LED bulbs for energy efficiency.'
    ],
    'oven': [
      'Used for baking, roasting, and cooking food.',
      'Check for preheat settings for best results.'
    ],
    'porch-light': [
      'Enhances outdoor visibility and safety.',
      'Consider motion-sensor lights for convenience.'
    ],
    'solarpanel': [
      'Harness solar energy to power your home.',
      'Can significantly reduce electricity costs.'
    ],
    'tv': [
      'Provides entertainment and information.',
      'Smart TVs can access streaming services.'
    ],
    'washer': [
      'Cleans clothes using water and detergent.',
      'Front-load washers are often more energy-efficient.'
    ]
  } as { [key: string]: string[] };  

  idleMsgs = [
    'Turn on an appliance to see how much electricity it uses!', 
    'You can tap the screen or use the switch!'
  ];
  
  msg = '';

  ngOnChanges(): void {
    if (this.info[this.itemToggled]) this.showApplianceMsg();
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
    const itemInfo = this.info[this.itemToggled];
    const appearTime = 10 * 1000;  // Changes how many seconds the message appears for.

    /* Only change message if not currently showing. */
    if (!this.showMsg) {
      this.msg = itemInfo[Math.floor(Math.random() * itemInfo.length)];
      this.showMsg = true;

      setTimeout(() => {
        this.showMsg = false;
      }, appearTime)
    }
  }

  showIdleMsg() {
    const appearTime = 10 * 1000;  // Changes how many seconds the message appears for.

    /* Only change message if not currently showing. */
    if (!this.showMsg) {
      this.msg = this.idleMsgs[Math.floor(Math.random() * this.idleMsgs.length)];
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
