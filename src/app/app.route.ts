import { RouterModule, Routes } from "@angular/router";

import { PostsComponent } from './posts/posts.component';

const APP_ROUTES: Routes = [
    { path: 'posts', component: PostsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'posts'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);