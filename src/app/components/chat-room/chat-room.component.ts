import { Component, OnDestroy, OnInit } from '@angular/core';
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
  subs!: Subscription;
  isUser!: User;

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private afs: AngularFirestore) {
    this.isUser = JSON.parse(<string>localStorage.getItem('user'));
  }

  ngOnInit(): void {
   this.subs = this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id'))
      )
      .subscribe(routePathParam =>this.commonService.updatePathParamState(routePathParam));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
