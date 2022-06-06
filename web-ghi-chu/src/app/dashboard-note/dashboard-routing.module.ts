import { TodoListComponent } from './../pages/todo-list/todo-list.component';
import { NotificationComponent } from './../pages/notification/notification.component';
import { UserProfileComponent } from './../pages/user-profile/user-profile.component';
import { DeleteNoteComponent } from '../pages/delete-note/delete-note.component';
import { DashboardNoteComponent } from './dashboard-note.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { NoteComponent } from '../pages/note/note.component';

const routes: Routes = [
  { path: '', component: DashboardNoteComponent, canActivate: [AuthGuard],
  children:[
    {
      path: 'note',
      component: NoteComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'bin',
      component: DeleteNoteComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'notification',
      component: NotificationComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'profile',
      component: UserProfileComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'todo-list',
      component: TodoListComponent,
      canActivate: [AuthGuard]
    }

  ] },
  // { path: 'note', loadChildren: () => import('../pages/note/note.component').then(m => m.NoteComponent), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
