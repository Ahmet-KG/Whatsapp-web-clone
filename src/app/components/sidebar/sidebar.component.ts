import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonService, RoomData } from '../../services/common.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage!: string;
  subs: Subscription[] = [];
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(private afs: AngularFirestore,
              private commonService: CommonService) { }

  ngOnInit(): void {

    this.randomSeed = Array.from({length: 20}, () => Math.floor(Math.random() * 1513125));

    this.subs.push(this.afs.collection('rooms').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {

            return {
              id: a.payload.doc.id,
              // @ts-ignore
              ...a.payload.doc.data()
            };
          })
        })
      ).subscribe((rooms: RoomData[]) => {
        this.roomData = rooms;
    }));
  }

    onFormSubmit(form: NgForm) {
      console.log(form)
    }

    ngOnDestroy() {
    this.subs.map(s => s.unsubscribe())
    }

  seedData(ev: string) {
    this.seedValue.emit(ev);
  }
}
