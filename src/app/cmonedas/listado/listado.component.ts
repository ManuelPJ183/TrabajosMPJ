import { Component, OnInit } from '@angular/core';
import { CriptoMService } from '../services/cripto-m.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(private criptoServ: CriptoMService) { }
  get resultadoAPI(){
    console.log(this.criptoServ.resultados2.length)
    return this.criptoServ.resultados2;
  }
  
  ngOnInit(): void {
    this.criptoServ.BuscarBitRango();
  }

}
