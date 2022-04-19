import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formSubmit(form: NgForm): void {
    console.log('')
  }
}
