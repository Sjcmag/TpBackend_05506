import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  urlBase: string = "http://localhost:3000/api/transaccion";
  constructor(private _http: HttpClient) { }

  addTransaction(transaccion: Transaccion): Observable<any> {
    
    const url = "/agregarTransaccion";

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    };
    const body = JSON.stringify(transaccion);

    return this._http.post(this.urlBase + url, body, httpOptions);

  }

  getTransactions(): Observable<any> {

    const url = "/verTransacciones";

    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };

    return this._http.get(this.urlBase + url, httpOptions);

  }

  getClientTransactions(emaCli: string): Observable<any> {

    const url = "/verTransaccionesCliente";

    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: {
        'emailCliente': emaCli,
      },
    };

    return this._http.get(this.urlBase + url, httpOptions);

  }

  getCurrencyTransactions(monOrg: string, monDes: string): Observable<any> {

    const url = "/verTransaccionesMoneda/" + monOrg + "/" + monDes;

    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };

    return this._http.get(this.urlBase + url, httpOptions);

  }

  calculateTransaction(transaccion: Transaccion): Observable<any> {

    const url = "https://currency-converter18.p.rapidapi.com/api/v1/convert";

    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '5362bc64b5mshcad50087f321a8ap169546jsn83432301691e',
        'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
      }),
      params: {
        "from": transaccion.monedaOrigen,
        "to": transaccion.monedaDestino,
        "amount": transaccion.cantidadOrigen
      },
    };

    return this._http.get(url, httpOptions);

  }
  getTextConvertidor(transaccion: Transaccion):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '5362bc64b5mshcad50087f321a8ap169546jsn83432301691e',
        'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
      }),
      }
      const body = new HttpParams()
      .set('from-value',transaccion.cantidadOrigen )
      .set('from-type', transaccion.monedaOrigen)
      .set('to-type',transaccion.monedaDestino);
      return this._http.post("https://community-neutrino-currency-conversion.p.rapidapi.com/convert",body, httpOptions);
      }
}
