import { Component, Input, OnInit } from '@angular/core';
import { CriptoMService } from '../services/cripto-m.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { CmonedasModule } from '../cmonedas.module';
import { CriptoMoneda } from '../interfaces/cripto.interfaces';

@Component({
  selector: 'app-datos-bitcoin',
  templateUrl: './datos-bitcoin.component.html',
  styleUrls: ['./datos-bitcoin.component.css']
})
export class DatosBitcoinComponent implements OnInit {
  datosd: any;

  VerDatos: any[] =[];

  constructor(private criptoServ: CriptoMService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.criptoServ.BuscarBitCoinDS(id) ),//switchMap( (param) => this.paisService.getPaisPorAlpha( param.id
      tap( console.log ))//es lo mismo que poner
      .subscribe( datos => {this.datosd = datos;
      console.log("Cripto Moneda Obtenida",this.datosd) });
  }

}
