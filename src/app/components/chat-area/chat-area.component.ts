import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Input() randomSeed!: string;
  subs!: Subscription;
  paramValue!: string;

  constructor(private commonService: CommonService,
              private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.subs = this.commonService.pathParam.subscribe(value => this.paramValue = value)
  }

  formSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const {message} = form.value;
    form.resetForm();
    this.afs.collection('rooms').doc(this.paramValue).collection('message').add({
      message,
      user_id: this.commonService.getUser().uid,
      name: this.commonService.getUser().displayName,
      time: firebase.firestore.FieldValue.serverTimestamp()
    })

  }
}
