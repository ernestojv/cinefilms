import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Theater } from 'src/app/core/models/theater.model';
import { TheaterService } from '../../../services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.css']
})
export class AddTheaterComponent implements OnInit {

  theaterForm = this.formBuilder.group({
    number: ['', [Validators.required]],
    name: ['', [Validators.required]],
    rows: ['', [Validators.required]],
    columns: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addTheater() {
    if (this.theaterForm.valid) {
      let theater: Theater = {
        number: +(this.theaterForm.value.number || 0),
        name: this.theaterForm.value.name || '',
        rows: +(this.theaterForm.value.rows || 0),
        columns: +(this.theaterForm.value.columns || 0),
      }
      try {
        this.theaterService.addTheater(theater).subscribe(
          () => {
            Swal.fire({
              title: 'Completado',
              text: 'Se ha agregado la sala correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/cms/theater']);
          }
        );
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, rellene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

}
