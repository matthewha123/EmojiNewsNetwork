import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hl-movement',
  templateUrl: './hl-movement.component.html',
  styleUrls: ['./hl-movement.component.css']
})
export class HlMovementComponent implements OnInit {
	@Input() dir: string;
	test_string = "yolo";
  constructor() { }

  ngOnInit() {
  }

  backward() {
  	console.log("BACKWARD!!!");
  }
  forward() {
  	console.log("FOWARD!!!!");
  }

}
