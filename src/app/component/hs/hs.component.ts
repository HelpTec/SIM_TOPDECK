import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HsService } from '../../hs.service';
import { Armador } from '../../../models/armador';
import { Procesador } from '../../procesador';
import { GraficosComponent } from "../graficos/graficos.component";

@Component({
  selector: 'app-hs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GraficosComponent],
  templateUrl: './hs.component.html',
  styleUrl: './hs.component.css'
})
export class HSComponent implements OnInit {
  arquetiposDeCartas: string[] = ['Esbirro', 'Arma', 'Hechizo', 'Locacion', 'Heroe'];
  armadores : Armador[] = [];
  formGroups: FormGroup[] = [];

  constructor(private fb:FormBuilder, private Servicio: HsService, private Procesador: Procesador){
    this.arquetiposDeCartas.forEach(() => {
      this.formGroups.push(this.createFormGroup());
  });
  }

  ngOnInit(): void {

  }
  calcuTotalesParciales(index:number): void {
    const formGroup = this.formGroups[index];
    const comunes = this.toNumber(formGroup.get('comunes')?.value);
    const comPar = this.toNumber(formGroup.get('comPAR')?.value*2);
    const raras = this.toNumber(formGroup.get('raras')?.value);
    const rarPar = this.toNumber(formGroup.get('rarPAR')?.value*2);
    const epicas = this.toNumber(formGroup.get('epicas')?.value);
    const epiPar = this.toNumber(formGroup.get('epiPAR')?.value*2);
    const legendarias = this.toNumber(formGroup.get('legendarias')?.value);
    const total = comunes + comPar+ raras + rarPar + epicas + epiPar+ legendarias
    formGroup.get('totales')?.setValue(total, { emitEvent: false });
  };

  toNumber(value: any): number {
    const numberValue = Number(value);
    return isNaN(numberValue) ? 0 : numberValue;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
        comunes: [0, Validators.required],
        comPAR: [0],
        raras: [0],
        rarPAR: [0],
        epicas: [0],
        epiPAR: [0],
        legendarias: [0],
        totales: [{value: 0, disabled: true}]
    });
  }

  obtenerTipoPorIndice(indice: number): string {
    const arquetipos = ['Esbirro', 'Arma', 'Hechizo', 'Locacion', 'Héroe'];
    return arquetipos[indice];
}

  crearArmador(index:number): Armador {
    const formGroup = this.formGroups[index];
    const tipo = this.obtenerTipoPorIndice(index);
    let comunes= this.toNumber(formGroup.get('comunes')?.value);
    let comunesPares= this.toNumber(formGroup.get('comPAR')?.value);
    let raras= this.toNumber(formGroup.get('raras')?.value);
    let rarasPares= this.toNumber(formGroup.get('rarPAR')?.value);
    let epicas= this.toNumber(formGroup.get('epicas')?.value);
    let epicasPares= this.toNumber(formGroup.get('epiPAR')?.value);
    let legendarias= this.toNumber(formGroup.get('legendarias')?.value);
    let clase= false;
    let total= this.toNumber(formGroup.get('totales')?.value);
    return new Armador(tipo, comunes, comunesPares, 
      raras, rarasPares, epicas, epicasPares, legendarias, clase, total);
  }

  generarListaArmadores(): void{
    this.armadores = [];
      for (let i= 0; i < this.arquetiposDeCartas.length; i++) {
      this.armadores.push(this.crearArmador(i));}
  }

  onSubmit() {
    this.generarListaArmadores()
    this.Procesador.procesarDatos(this.armadores)
    let lista = this.Procesador.getListaMazo()
  }
}
