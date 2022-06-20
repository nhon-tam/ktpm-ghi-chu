import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/note'  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) , canActivate: [AuthGuard],},
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) , canActivate: [AuthGuard],},
  { path: 'dashboard', loadChildren: () => import('./dashboard-note/dashboard-note.module').then(m => m.DashboardNoteModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
