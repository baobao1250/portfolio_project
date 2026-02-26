import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth';
export const routes: Routes = [
    {
        path: 'bai-1',
        // Dùng loadComponent và import() dạng Promise. 
        // Trình duyệt sẽ tách file exercise-one ra thành 1 cục JS riêng biệt!
        loadComponent: () => import('./features/exercise-one/exercise-one').then(m => m.ExerciseOne)
    },
    {
        path: 'bai-2',
        loadComponent: () => import('./features/exercise-two/exercise-two').then(m => m.ExerciseTwo)
    },
    {
        path: 'bai-3',
        loadComponent: () => import('./features/exercise-three/exercise-three').then(m => m.ExerciseThree),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(m => m.Login)
    },

    { path: '', redirectTo: 'bai-1', pathMatch: 'full' }
];