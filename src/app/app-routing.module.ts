import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatDefaultPageComponent } from './components/chat-default-page/chat-default-page.component';
import { LoginComponent } from './components/login/login.component';
import { ChatGuard } from './guards/chat.guard';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'room/:id',
        component: ChatRoomComponent
      },
      {
        path: '',
        component: ChatDefaultPageComponent
      }
    ],
    canActivate: [ChatGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
