import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/api-response';
import { Utils } from '../../shared/services/utils';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {
  userInfo: UserInfo;
  constructor(private util: Utils) { }

  ngOnInit(): void {
    this.userInfo = this.util.getUserFromToken();
    // console.log(this.userInfo);
  }

}
