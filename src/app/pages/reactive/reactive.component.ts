import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoreService } from 'src/app/services/validadore.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoreService) { 
    this.crearFormulario()
    this.cargarDataAlFormulario()
    // this.cargarListeners()
  }

  ngOnInit() {
  }

  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched
  }

  get emailNoValido() {
    return this.formulario.get('correo').invalid && this.formulario.get('correo').touched
  }

  get usuarioNoValido() {
    return this.formulario.get('usuario').invalid && this.formulario.get('usuario').touched
  }

  get distritoNoValido() {
    return this.formulario.get('direccion.distrito').invalid && this.formulario.get('direccion.distrito').touched
  }

  get ciudadNoValido() {
    return this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched
  }

  get pasatiempos() {
    return this.formulario.get('pasatiempos') as FormArray
  }

  get pass1NoValido() {
    return this.formulario.get('pass1').invalid && this.formulario.get('pass1').touched
  }

  get pass2NoValido() {
    const pass1 = this.formulario.get('pass1').value;
    const pass2 = this.formulario.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  crearFormulario() {

    this.formulario = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noXApellido]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario : ['', , this.validadores.existeUsuario],
      pass1   : ['', Validators.required],
      pass2   : ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad  : ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsEquals('pass1','pass2')
    });

  }

  // cargarListeners() {
  //   this.formulario.valueChanges.subscribe( valor => {
  //     console.log(valor);
      
  //   })
  // }

  cargarDataAlFormulario() {

    this.formulario.reset({
      nombre: "Victor",
      apellido: "Bolaños Solis",
      correo: "viktorb.132@gmail.com",
      pass1: '113',
      pass2: '113',
      direccion: {
        distrito: "Milpa",
        ciudad: "Ciudad de Mexico"
      }
    })

  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''))
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i)
  }

  guardar() {
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched())
        } else {
          control.markAsTouched()
        }
      })
    }

    this.formulario.reset({
      nombre: 'Sin nombre'
    })

    // En el reset no de debe poner todos los campos del objeto

  }

}
