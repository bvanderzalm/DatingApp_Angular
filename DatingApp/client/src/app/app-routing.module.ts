import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {path: '', component: HomeComponent},   // With empty string we are Essentially saying this is our homepage. When we goto the losthost url, homecomponent.html will be loaded.

  {path: 'members', component: MemberListComponent},
  {path: 'members/:id', component: MemberDetailComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'messages', component: MessagesComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'},    // With wildcard route, some URL path we don't know. It takes user back to home page (at the moment). Do some 404 page not found later prob.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
