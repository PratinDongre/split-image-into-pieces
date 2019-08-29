import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  img: any;colum: number = 4;row: number = 3;width:number;height:number;_length:number;source:string;
  constructor() { }

  ngOnInit() {
    this.img = new Image();
    this.source = '../assets/5.jpg';
    this.loadImage(this.source);
  }

  loadImage(path) {
    this.img = new Image();
    this.img.crossOrigin = "Anonymous";
    this.img.src = path;

    this.img.onload =  ()=> {
      console.log(this.img)
      this.width = this.img.width;
      this.height = this.img.height;
      this._length = -this.colum;

      // create a <div/> with all basic characteristics, to be cloned over and over in the loops below.
      var $basicDiv = $('<div/>', {
        class: 'splitImg',
        css: {
          'width': Math.floor(this.width/this.colum),
          'height': Math.floor(this.height/this.row),
          'background-image': 'url(' + path + ')',
          'padding': '1px',
          'background-clip': 'content-box',
          'background-repeat': 'no-repeat'
        }
      });

      // Finding a node in the DOM is slow. Do it once and assign the returned jQuery collection.
      // Also, #wrapper's width can be set here.
      var $wrapper = $('#image_wrap').width(this.width + this.colum * 2); 
      for (let i = 0; i > this._length; i--) {
        for (let j = 0; j > this._length; j--) {
          $basicDiv.clone().css({'background-position': `${this.width/this.colum * j}px ${this.height/this.row * i}px`}).appendTo($wrapper);
        }
      }
    }
  }

}
