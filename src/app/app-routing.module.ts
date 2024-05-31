import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'animal-list',
    loadChildren: () => import('./animal/animal-list/animal-list.module').then( m => m.AnimalListPageModule)
  },
  {
    path: 'animal-edit/:id',
    loadChildren: () => import('./animal/animal-edit/animal-edit.module').then( m => m.AnimalEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
