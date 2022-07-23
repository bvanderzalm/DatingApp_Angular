import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},   // With empty string we are Essentially saying this is our homepage. When we goto the losthost url, homecomponent.html will be loaded.
  {
    path: '',                         // For any path
    runGuardsAndResolvers: 'always',  // Always define guards on every execution (anybody can access pages without being logged in)
    canActivate: [AuthGuard],         // The only way to bypass this block is through our auth.guard which requires our user to be logged in.
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component: MemberDetailComponent},
      {path: 'member/edit', component: MemberEditComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},    // With wildcard route, some URL path we don't know. It takes user back to home page (at the moment). Do some 404 page not found later prob.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
