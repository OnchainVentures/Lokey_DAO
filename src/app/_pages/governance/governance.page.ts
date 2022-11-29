import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.page.html',
  styleUrls: ['./governance.page.scss'],
})
export class GovernancePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    document.querySelector<HTMLDivElement>('#governance').style.color = 'var(--color-red)';
  }
  ionViewDidLeave() {
    document.querySelector<HTMLDivElement>('#governance').style.color = '#ffffff';
  }

}
