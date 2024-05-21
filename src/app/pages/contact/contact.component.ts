import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm!: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  /**
   * Maneja el envío del formulario.
   * @param event El evento de envío del formulario.
   */
  enviar(event: Event): void {
    event.preventDefault();
    console.log(this.contactForm.value);
    this.contactForm.reset();
    this.formSubmitted = true;
    setTimeout(() => (this.formSubmitted = false), 3000);
  }

  /**
   * Verifica si un campo tiene errores específicos.
   * @param field El nombre del campo a verificar.
   * @param typeError El tipo de error a buscar.
   * @returns Verdadero si el campo tiene el error especificado y ha sido tocado.
   */
  hasErrors(field: string, typeError: string): boolean | undefined {
    return (
      this.contactForm.get(field)?.hasError(typeError) &&
      this.contactForm.get(field)?.touched
    );
  }
}
