import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from 'app/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'user-profile',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
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