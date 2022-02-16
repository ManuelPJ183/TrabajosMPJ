import { Component, OnInit } from '@angular/core';
import { CriptoMService } from '../services/cripto-m.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
valor :string = "";
  constructor(private criptoServ: CriptoMService) { }

  buscarD(){
    console.log(this.valor);
  this.criptoServ.BuscarBitCoin(this.valor);
  }

  ngOnInit(): void {
  }

}
