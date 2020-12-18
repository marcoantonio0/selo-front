import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products;
  public error = false;
  public loading = true;
  constructor(
    private sProduct: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.loading = true;
      this.sProduct.getProducts(params.id).subscribe(r => {
        this.products = r;
        this.loading = false;
        console.log(r);
      }, e => {
        this.loading = false;
        this.error = true;
      });
    })
  }


}
