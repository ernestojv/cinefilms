import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/core/models/theater.model';
import Swal from 'sweetalert2';
import { TheaterService } from '../../../services/theater.service';

@Component({
  selector: 'app-update-theater',
  templateUrl: './update-theater.component.html',
  styleUrls: ['./update-theater.component.css']
})
export class UpdateTheaterComponent implements OnInit {

  theater: Theater | null = null;

  theaterForm = this.formBuilder.group({
    number: ['', [Validators.required]],
    name: ['', [Validators.required]],
    rows: ['', [Validators.required]],
    columns: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        let id = params.get('id') || '';
        this.getTheater(id);
      }
    });
  }

  getTheater(id: string) {
    this.theaterService.getTheaterById(id).subscribe(
      (theater: any) => {
        this.theater = theater.data;
        console.log(this.theater);
        if (this.theater) {
          this.theaterForm.setValue({
            number: this.theater.number.toString(),
            name: this.theater.name,
            rows: this.theater.rows.toString(),
            columns: this.theater.columns.toString(),
          });
        }

      }
    );
  }

  updateTheater() {
    if (this.theaterForm.valid && this.theater) {
      let theater: Theater = {
        number: +(this.theaterForm.value.number || 0),
        name: this.theaterForm.value.name || '',
        rows: +(this.theaterForm.value.rows || 0),
        columns: +(this.theaterForm.value.columns || 0),
      }
      try {
        this.theaterService.updateTheater(this.theater?._id || '', theater).subscribe(
          () => {
            Swal.fire({
              title: 'Completado',
              text: 'Se ha actualizado la sala correctamente',
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
