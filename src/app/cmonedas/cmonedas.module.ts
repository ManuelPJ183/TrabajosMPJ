import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ListadoComponent } from './listado/listado.component';
import { ResulBusqComponent } from './resul-busq/resul-busq.component';
import { DatosBitcoinComponent } from './datos-bitcoin/datos-bitcoin.component';
import {RouterModule} from '@angular/router';
import {ChipsModule} from 'primeng/chips';

@NgModule({
  declarations: [
    BusquedaComponent,
    ListadoComponent,
    ResulBusqComponent,
    DatosBitcoinComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ChipsModule
  ],exports:[ 
     ]
})
export class CmonedasModule { }
