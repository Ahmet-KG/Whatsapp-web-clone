import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import User = firebase.User;

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Output() chatData: EventEmitter<any> = new EventEmitter<any>()

  subs: Subscription[] = [];
  isUser!: User;
  item: any;
  messageData: any[] = [];

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private afs: AngularFirestore) {
    this.isUser = JSON.parse(<string>localStorage.getItem('user'));
  }

  ngOnInit(): void {
   this.subs.push(this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id'))
      )
      .subscribe(routePathParam =>this.commonService.updatePathParamState(routePathParam)));

   this.subs.push(
     this.route.params.subscribe(par => {
       this.afs.collection('rooms').doc(par['id']).get().subscribe(data => {
         this.item = data;
         this.chatData.emit(this.item.data().name)
       });
       this.subs.push(this.afs.collection('rooms').doc(par['id'])
         .collection('messages', ref => ref.orderBy('time', 'asc'))
         .valueChanges().subscribe(messages => this.messageData = messages));
     })
   )
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
