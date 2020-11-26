import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {
  showEmail = false;
  editEmail = false;
  emailLoading = false;
  loadingCep = false;
  public defaultAddress;
  public address = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    number: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(1)]),
    cep: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    complement: new FormControl('', Validators.maxLength(128)),
    district: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    uf: new FormControl('', [Validators.required])
  })
  constructor(
    public sAuth: AuthenticationService,
    private sUser: UserService,
    private title: Title
  ) {
    this.title.setTitle('Minha Conta');
    this.sUser.getAddress(this.sAuth.currentUserValue.id).subscribe(r => {
      this.defaultAddress = r;
      this.address.get('address').setValue(r.address);
      this.address.get('number').setValue(r.number);
      this.address.get('cep').setValue(r.cep);
      this.address.get('city').setValue(r.city);
      this.address.get('complement').setValue(r.complement);
      this.address.get('district').setValue(r.district);
      this.address.get('uf').setValue(r.uf);
    }, e => {
      console.log('Erro ao encontrar endereço.');
    });
  }

  ngOnInit(): void {
  }

  getCep(value: string): void {
    if(value.replace('-', '').length === 8){
      this.loadingCep = true;
      this.sUser.cep(value.replace('-', '')).subscribe(r => {
        this.loadingCep = false;
        if (r.erro === true){
          return;
        } else {
          this.setCepValues(r);
        }
      }, e => {
        this.loadingCep = false;
      });
    }
  }


  enactiveEmail(){
    this.editEmail = false;
    this.address.get('address').setValue(this.defaultAddress.address);
    this.address.get('number').setValue(this.defaultAddress.number);
    this.address.get('cep').setValue(this.defaultAddress.cep);
    this.address.get('city').setValue(this.defaultAddress.city);
    this.address.get('complement').setValue(this.defaultAddress.complement);
    this.address.get('district').setValue(this.defaultAddress.district);
    this.address.get('uf').setValue(this.defaultAddress.uf);
  }

  setCepValues(address) {
    this.address.get('address').setValue(address.logradouro);
    this.address.get('district').setValue(address.bairro);
    this.address.get('city').setValue(address.localidade);
    this.address.get('uf').setValue(address.uf);
  }

  submitEmail(){
    if(this.editEmail){
      if(this.address.valid && this.address.touched && JSON.stringify(this.address.value) != JSON.stringify(this.defaultAddress)){
        this.address.disable();
        this.emailLoading = true;
        this.sUser.putAddress(this.sAuth.currentUserValue.id, this.address.value).subscribe(r => {
          this.emailLoading = false;
          this.defaultAddress = this.address.value;
          this.enactiveEmail();
          this.address.enable();
        }, e => {
          this.address.enable();
          this.emailLoading = false;
        });
      }
    }
  }


  getError(formcontrolname: string): string {
    const form = this.address.controls[formcontrolname];
    if(form.invalid && (form.dirty || form.touched)){
      if (form.errors?.required) {
        return 'Este campo é requirido.';
      }
      if (form.errors?.maxlength){
        return `Máximo ${form.errors?.maxlength.requiredLength} caracteres.`;
       }
      if (form.errors?.minlength){
      return `Mínimo ${form.errors?.minlength.requiredLength} caracteres.`;
      }
    }
  }

  emailShow(email: string): string {
    if(email){
      if(!this.showEmail){
        const split = email.split('@');
        const emailBefore = split[0];
        const emailAfter = split[1];
        let totalHidden = '';
        for (let i = 0; i < emailBefore.length; i++) {
          totalHidden += '*';
        }
        return totalHidden + '@' + emailAfter;
      } else{
        return email;
      }
    } else {
      return '';
    }
  }


}
