import { Component, OnInit } from '@angular/core';
import { CriptoMService } from '../services/cripto-m.service';

@Component({
  selector: 'app-resul-busq',
  templateUrl: './resul-busq.component.html',
  styleUrls: ['./resul-busq.component.css']
})
export class ResulBusqComponent implements OnInit {
 
  
  constructor(public criptoServ: CriptoMService) { }
  get resultadoAPI(){
    return this.criptoServ.resultados;
  }
  
  ngOnInit(): void {
  }

}
