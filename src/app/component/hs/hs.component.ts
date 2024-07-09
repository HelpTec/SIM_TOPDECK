import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HsService } from '../../hs.service';

@Component({
  selector: 'app-hs',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hs.component.html',
  styleUrl: './hs.component.css'
})
export class HSComponent implements OnInit {
  valor: number | null = null
  mazo: (number | string | null)[] = [];
  mazosTesteados: (number | string | null)[][] = [];
  form!: FormGroup;
  mensajeVisible: boolean = false;
  intentosIndividuales: number[] = [];
  numBuscados: (number | string)[] = [];
  falla: string[] = [];
  cantidadRepetidas: number[] = [];
  longitudes: number[] = [];

  constructor(private fb:FormBuilder, private Servicio: HsService){}

  ngOnInit(): void {
    this.form = this.fb.group({
      cartas: [''],
      pares: [''],
      comodines: ['']
    });
  }

  onSubmit(form : FormGroup) {

    const cartas = this.form.get('cartas')!.value;
    const repetidas = this.form.get('pares')!.value;
    const resultado = this.Servicio.muestrario(cartas, repetidas);
    this.mazo= this.Servicio.generarMazo(cartas, repetidas);
    this.valor= resultado[0];
    this.intentosIndividuales=resultado[1];
    this.mazosTesteados = resultado[2];
    this.numBuscados = resultado[3];
    this.falla= resultado[4];
    this.cantidadRepetidas= resultado[6]; this
    this.longitudes= resultado[5];
    this.mensajeVisible = true
  }
}
