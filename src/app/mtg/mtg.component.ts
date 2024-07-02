import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SimTopdeckService } from '../sim-topdeck.service';

@Component({
  selector: 'app-mtg',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './mtg.component.html',
  styleUrl: './mtg.component.css'
})
export class MTGComponent implements OnInit {
  valor: number | null = null;
  form!: FormGroup;
  mensajeVisible: boolean = false;

  constructor(private fb:FormBuilder, private Servicio: SimTopdeckService){}

  ngOnInit(): void {
    this.form = this.fb.group({
      cartas: [''],
      comodines: ['']
    });
  }

  onSubmit(form: FormGroup) {

    const value1 = this.form.get('cartas')!.value;
    const value2 = this.form.get('comodines')!.value;
    let cartas = value1
    let comodines = value2
    this.valor= this.Servicio.muestrario(cartas, comodines);
    this.valor.toFixed(2);
    this.mensajeVisible = true
  }
}