import { Component, OnInit } from '@angular/core';
import { Utils } from '../../shared/services/utils';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {
  userInfo: any;
  constructor(private util: Utils) { }

  ngOnInit(): void {
    this.userInfo = this.util.getUserFromToken();
  }

}
