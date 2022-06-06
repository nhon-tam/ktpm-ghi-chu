import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeleteNoteComponent } from './delete-note.component';

const routes: Routes = [
  { path: '', component: DeleteNoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DeleteNoteRoutingModule { }
