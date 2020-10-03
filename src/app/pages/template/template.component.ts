import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Víctor',
    apellido: 'Bolaños',
    correo: 'viktorb.132@gmail.com',
    pais: 'MEX'
  }

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit() {

    this.paisService.getPaises().subscribe(paises => {

      this.paises = paises;
      this.paises.unshift({
        nombre: '[Seleccione pais]',
        codigo: 'Mex'
      })
      
    });

  }

  guardar(formulario:NgForm) {

    if (formulario.invalid) {
      Object.values(formulario.controls).forEach(control => {
        control.markAsTouched()
      })
      return;
    }

    console.log(formulario.value);
    
  }

}
