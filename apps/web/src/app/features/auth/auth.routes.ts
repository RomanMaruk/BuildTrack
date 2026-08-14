import { Route } from "@angular/router";
import { LayoutAuthComponent } from "./components/layout-auth/layout-auth.component";


export const authRoutes: Route[] = [
    {
        path: '',
        component: LayoutAuthComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register').then(m => m.Register)
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword)
            },
        ]
    },

]