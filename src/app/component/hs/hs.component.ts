import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HsService } from '../../hs.service';
import { Armador } from '../../../models/armador';

@Component({
  selector: 'app-hs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hs.component.html',
  styleUrl: './hs.component.css'
})
export class HSComponent implements OnInit {
  arquetiposDeCartas: string[] = ['Esbirro', 'Arma', 'Hechizo', 'Locacion'];
  form!: FormGroup;
  armadores : Armador[] = [];
  formGroups: FormGroup[] = [];

  constructor(private fb:FormBuilder, private Servicio: HsService){
    this.arquetiposDeCartas.forEach(() => {
      this.formGroups.push(this.createFormGroup());
  });
    this.form = this.fb.group({
      arquetipos: this.fb.array([])
  });
    this.inicializarArquetipos();
  }

  ngOnInit(): void {
/*    this.form = this.fb.group({
      comunes:[0, Validators.required],
      comPAR:[0],
      raras:[0],
      rarPAR:[0],
      epicas:[0],
      epiPAR:[0],
      legendarias:[0],
      totales:[{ value: 0, disabled: true}]
    });
    this.form.valueChanges.subscribe(value => {
      this.calcuTotalesParciales(i);
    });
*/
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
  inicializarArquetipos() {
    const arquetipos = ['Esbirros', 'Armas', 'Hechizos', 'Locaciones', 'Héroes'];
    const arquetipoFGs = arquetipos.map(tipo => this.fb.group({
      comunes: [0],
      comunesPares: [0],
      raras: [0],
      rarasPares: [0],
      epicas: [0],
      epicasPares: [0],
      legendarias: [0],
      totales: [0],
    }));
    const formArray = this.form.get('arquetipos') as FormArray;
    arquetipoFGs.forEach(fg => formArray.push(fg));}

  obtenerArmadores(): Armador[] {
      const arquetiposArray = this.form.get('arquetipos') as FormArray;
      return arquetiposArray.controls.map((fg, index) => {
        const values = fg.value;
        const tipo = this.obtenerTipoPorIndice(index);
        return new Armador(
          tipo,
          values.comunes,
          values.comunesPares,
          values.raras,
          values.rarasPares,
          values.epicas,
          values.epicasPares,
          values.legendarias,
          false,  // Clase siempre falsa
          values.totales
        );
      });
    }
  obtenerTipoPorIndice(indice: number): string {
      const arquetipos = ['Esbirros', 'Armas', 'Hechizos', 'Locaciones', 'Héroes'];
      return arquetipos[indice];
  }

  procesarFormulario() {
      this.armadores = this.obtenerArmadores();
      console.log(this.form.value);
      console.log(this.armadores);
      console.log(this.armadores[0]);
  }

  onSubmit() {
   this.procesarFormulario();
  }
}
