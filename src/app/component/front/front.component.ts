import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {
  form!: FormGroup;
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.form = this.fb.group({
      input1: [''],
      input2: ['']
    });
  }
  handleInputs(): void {
    const value1 = this.form.get('input1')!.value;
    const value2 = this.form.get('input2')!.value;
  }

  onSubmit(formulario: NgForm) {
    console.log('Formulario enviado:', formulario.value);
  }

}
