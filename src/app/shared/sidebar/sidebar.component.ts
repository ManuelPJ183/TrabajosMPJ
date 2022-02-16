import { Component, OnInit } from '@angular/core';
import { CriptoMService } from 'src/app/cmonedas/services/cripto-m.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public criptoServ: CriptoMService) { }

get Historial(){
return this.criptoServ.historialG;
}
  ngOnInit(): void {
  }

}
