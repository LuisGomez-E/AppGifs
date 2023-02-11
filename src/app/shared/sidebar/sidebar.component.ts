import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  
  get historial() {
    return this.GifsService.historial;
  } 

  
  constructor( private GifsService: GifsService) {}

  buscar(termino: string) {
    this.GifsService.buscarGifs(termino);
  }

  BorrarH() {
    console.log(this.GifsService.historial);
    localStorage.clear();
  }
}

