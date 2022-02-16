import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusquedaComponent } from './cmonedas/busqueda/busqueda.component';
import { DatosBitcoinComponent } from './cmonedas/datos-bitcoin/datos-bitcoin.component';
import { ListadoComponent } from './cmonedas/listado/listado.component';

const routes: Routes = [
{
  path: 'buscar',
component: BusquedaComponent,
pathMatch: 'full'
},
{
path: 'listar',
component: ListadoComponent,
pathMatch: 'full'
},
{
  path: 'datos/:id',
  component: DatosBitcoinComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
