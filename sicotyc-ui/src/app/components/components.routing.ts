import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    {
        path: 'user-profile',
        component: PagesComponent,
        children: [
            { path: '', component: UserProfileComponent, data: {title: 'Perfil de Usuario'}}
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class ComponentRoutingModule {}