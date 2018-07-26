import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HlMasterComponent } from './hl-master/hl-master.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'
import {LandingPageComponent } from './landing-page/landing-page.component'

const routes: Routes = [
	{path:'' , redirectTo:"/landing", pathMatch:"full"},
	{path:'landing', component: LandingPageComponent},
	{path: 'headline/:id', component: HlMasterComponent },
	{path: '**', component: PageNotFoundComponent }

]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
