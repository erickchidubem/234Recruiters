import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})
export class PublicLayoutComponent implements OnInit {

  constructor(private route:ActivatedRoute) { 
    console.log('constructor : '+route);
    
  }

  ngOnInit(): void {
    console.log('NGONINT : '+this.route);
  }

}
