import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = '4Fg4OoDOq5kr4glKZSJF3MK3waMaTIP5';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
    // localStorage.getItem('historial');
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // this.resultados = localStorage.getItem('resultados')!;

  }

  buscarGifs( query: string) {

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', query)
            .set('limit', '9');

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
          .subscribe( ( resp ) => {
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));


          })
  }

}
