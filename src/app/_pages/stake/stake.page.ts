import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stake',
  templateUrl: './stake.page.html',
  styleUrls: ['./stake.page.scss'],
})
export class StakePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    document.querySelector<HTMLDivElement>('#stake').style.color = 'var(--color-red)';
  }
  ionViewDidLeave() {
    document.querySelector<HTMLDivElement>('#stake').style.color = '#ffffff';
  }

}
