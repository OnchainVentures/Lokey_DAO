import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './ecosystem.page.html',
  styleUrls: ['./ecosystem.page.scss'],
})
export class EcosystemPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    document.querySelector<HTMLDivElement>('#ecosystem').style.color = 'var(--color-red)';
  }
  ionViewDidLeave() {
    document.querySelector<HTMLDivElement>('#ecosystem').style.color = '#ffffff';
  }

}
