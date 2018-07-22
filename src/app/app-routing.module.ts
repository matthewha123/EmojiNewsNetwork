import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HlMasterComponent } from './hl-master/hl-master.component';

const routes: Routes = [
	{path: 'headline/:id', component: HlMasterComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
