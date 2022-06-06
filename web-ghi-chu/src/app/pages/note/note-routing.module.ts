import { AuthGuard } from './../../auth/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NoteComponent } from './note.component';

const routes: Routes = [
  { path: '', component: NoteComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class NoteRoutingModule { }
