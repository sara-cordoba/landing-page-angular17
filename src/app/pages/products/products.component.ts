import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: IProduct[] = [];
  tablesStyles: string[] = [
    'table-primary',
    'table-secondary',
    'table-success',
    'table-danger',
    'table-warning',
    'table-info',
    'table-light',
  ];

  private _apiService = inject(ApiService);
  private _router = inject(Router);

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this._apiService.getProducts().subscribe((data: IProduct[]) => {
      this.productList = data;
    });
  }

  /**
   * Navega a la página de detalles de un producto específico.
   * @param id El ID del producto.
   */
  navegate(id: number): void {
    this._router.navigate(['/products', id]);
  }
}
