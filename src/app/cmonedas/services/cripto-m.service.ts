import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CriptoMoneda } from '../interfaces/cripto.interfaces';
@Injectable({
  providedIn: 'root'
})
export class CriptoMService {
  Encontrar = false;
  noFound = false;
  private apiKey : string = "6802c690b44b2b6c53e933a6dbce7da36ce975af";//API key que se optiene en giphy
    private apiUrl: string = 'http://api.nomics.com/v1/currencies';
  get httpParams () {
    //indicamos los parámetros que queremos que nos devuelva la petición
    //depende de como funcione la API
        return new HttpParams().set( 'fields', 'id, name, price,volume,added,logo_url,max_supply' );

    }
    private _historial : string[] = [];//Guarda el historial de búsquedas, por convención se pone _ para indicar que es privada 
    private imgdf : any[] = [];//Guarda el historial de búsquedas, por convención se pone _ para indicar que es privada 

    public resultados: CriptoMoneda[] = [];
  public resultados2: CriptoMoneda[] = [];//Hacemos uso de la interfaz Gif
  public busqueda: any[] = [];
  historialG: any[] = [];

    constructor(private http: HttpClient ) {
   // Inyectamos el HttpClient del HttpClientModule importado en app.module.ts
      //El constructor sólo se ejecuta una vez
}

 public BuscarBitCoin( namebusq: any ) {
   this.noFound = false;
var BusqMayu = namebusq.toLocaleUpperCase();
    if ( !this._historial.includes(BusqMayu)){
      const BusquedaJoin = BusqMayu.replace(/\s{2,}/g, ' ').trim();
      console.log(BusquedaJoin);
     
      if(this._historial.length >= 5 ){
        if(BusquedaJoin.includes(",")){
          var BusquedaS = BusquedaJoin.split(",");
          for(let busqueda of BusquedaS){
            if ( !this._historial.includes(busqueda)){

            this._historial.pop();
            this._historial.unshift(busqueda);
            this._historial = this._historial.splice(0,10);
          }}}else{
            this._historial.pop();
            this._historial.unshift(BusquedaJoin);
            this._historial = this._historial.splice(0,10);
          }
      }else{
        if(BusquedaJoin.includes(",")){
        var BusquedaS = BusquedaJoin.split(",");
        for(let busqueda of BusquedaS){
          if ( !this._historial.includes(busqueda)){
          this._historial.unshift(busqueda);
          this._historial = this._historial.splice(0,10);  
          }
        }}else{
          this._historial.unshift(BusquedaJoin);
          this._historial = this._historial.splice(0,10);
        }
      }
      localStorage.setItem("historial", JSON.stringify(this._historial));
    }
    this.historialG = JSON.parse(localStorage.getItem('historial')  || '[]');
        this.http.get<CriptoMoneda[]>(`${ this.apiUrl }/ticker?key=${ this.apiKey }&ids=${ BusqMayu }`).subscribe(
      (response) => {
        if  (response.length <= 0){
          this.noFound = true
          this.Encontrar = false
          console.log(this.noFound);
          this.resultados = response;
          return this.http.get<CriptoMoneda[]>(`${ this.apiUrl }/ticker?key=${ this.apiKey }&ids=${ BusqMayu }`);
        }else{
          this.noFound = false
          this.Encontrar = true
          console.log(this.noFound);
          this.resultados = response;
        return this.http.get<CriptoMoneda[]>(`${ this.apiUrl }/ticker?key=${ this.apiKey }&ids=${ BusqMayu }`);
        }
      },
      );
    }


  BuscarBitCoinDS( termino: string ):Observable<CriptoMoneda[]>{
    console.log(this.http.get<CriptoMoneda[]>(`${ this.apiUrl }/ticker?key=${ this.apiKey }&ids=${ termino }`));
    return this.http.get<CriptoMoneda[]>(`${ this.apiUrl }/ticker?key=${ this.apiKey }&ids=${ termino }`)
    }


   public BuscarBitRango( ) {
    this.noFound = false;
        const params = new HttpParams()
    var CurrentDate = new Date();
         this.http.get<CriptoMoneda[]>(`https://api.nomics.com/v1/currencies/ticker?key=6802c690b44b2b6c53e933a6dbce7da36ce975af&limit=10&status=active&per-page=10&interval=1d&order=desc`).subscribe(
       (response) => {
         if  (response.length <= 0){
           this.noFound = true
           console.log(this.noFound);
         }         
         this.resultados2 = response
       },
       );
     }
}
