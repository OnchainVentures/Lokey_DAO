import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    document.querySelector<HTMLDivElement>('#about-us').style.color = '#ffffff';
  }
  ionViewDidLeave() {
    document.querySelector<HTMLDivElement>('#about-us').style.color = 'var(--color-red)';
  }
}
