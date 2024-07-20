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
  form!: FormGroup;
  mensajeVisible: boolean = false;
  
  constructor(private fb:FormBuilder, private Servicio: HsService){}

  ngOnInit(): void {
    this.form = this.fb.group({
      comunes: [''],
      pares: [''],
      comodines: ['']
    });
  }

  onSubmit(form : FormGroup) {
  }
}
