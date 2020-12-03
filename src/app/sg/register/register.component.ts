import { UserService } from 'src/app/_services/user.service';
import { CustomerService } from './../../_services/customer.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AuthenticationCustomerService } from 'src/app/_services/authentication-customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private userService: UserService,
    private snack: MatSnackBar,
    private auth: AuthenticationCustomerService,
    private route: Router,
    private title: Title
  ) {
    this.title.setTitle(`Cadastre-se | ${environment.pageTitle}`);
    this.getCep();
  }
  @ViewChild('stepper') stepper: MatStepper;
  timeinterval: any;
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    fantasy_name: new FormControl('', [Validators.required,  Validators.maxLength(255)]),
    website: new FormControl('', [Validators.required,  Validators.maxLength(255), Validators.pattern(/^((www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/)]),
    company_name: new FormControl('', [Validators.required,  Validators.maxLength(255)]),
    phone: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.maxLength(128)]),
    repeat_password: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.maxLength(128)])
  }, { validators: this.passwordMatchValidator });
  companyForm = new FormGroup({
    cep: new FormControl('', [Validators.required]),
    address: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(8)]),
    number: new FormControl({value: '', disabled: true}, [Validators.required, Validators.nullValidator]),
    complement: new FormControl({value: '', disabled: true}, [Validators.maxLength(255)]),
    city: new FormControl({value: '', disabled: true}, [Validators.required, Validators.maxLength(255)]),
    district: new FormControl({value: '', disabled: true}, [Validators.required, Validators.maxLength(255)]),
    uf: new FormControl({value: '', disabled: true}, [Validators.required])
  });
  alerts: any[] = [];
  disabled = false;
  isLoading = false;
  ownersForm =  new FormArray([]);
  loadingCep = false;

   passwordMatchValidator(control: AbstractControl): any {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('repeat_password').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('repeat_password').setErrors({ NoPassswordMatch: true });
    }
  }

  ngOnInit(): void {
    this.ownersForm.push(this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone:  new FormControl('', [Validators.required]),
      birthday:  new FormControl('', [Validators.required]),
      role:  new FormControl('', [Validators.required, Validators.maxLength(255)]),
      cpfcnpj:  new FormControl('', [Validators.required])
    }));
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  public alert(error, type: 'warning'|'danger'|'success',  timeout = false, clear = false): void {
    if(this.timeinterval){
      clearInterval(this.timeinterval);
    }
    if(clear){
      this.alerts = [];
    }
    this.alerts.push({type, error});
    if(timeout) {
      this.timeinterval = setInterval(() => {
        this.alerts.pop();
      }, 2500);
    }
  }

  setCepValues(dados): void {
    this.companyForm.get('address').disable();
    this.companyForm.get('district').disable();
    this.companyForm.get('city').disable();
    this.companyForm.get('uf').disable();
    this.companyForm.get('complement').enable();
    this.companyForm.get('number').enable();
    this.companyForm.get('address').setValue(dados.logradouro);
    this.companyForm.get('district').setValue(dados.bairro);
    this.companyForm.get('city').setValue(dados.localidade);
    this.companyForm.get('uf').setValue(dados.uf);
  }

  enableCepInfos(): void{
    this.companyForm.get('complement').reset();
    this.companyForm.get('number').reset();
    this.companyForm.get('address').reset();
    this.companyForm.get('district').reset();
    this.companyForm.get('city').reset();
    this.companyForm.get('uf').reset();
    this.companyForm.get('complement').enable();
    this.companyForm.get('number').enable();
    this.companyForm.get('address').enable();
    this.companyForm.get('district').enable();
    this.companyForm.get('city').enable();
    this.companyForm.get('uf').enable();
  }

  getCep(){
    this.companyForm.get('cep').valueChanges.subscribe(cep => {
      if (cep.length === 8) {
        this.loadingCep = true;
        this.userService.cep(cep).subscribe(r => {
          this.loadingCep = false;
          if (r.erro === true){
            this.enableCepInfos();
          } else {
            this.setCepValues(r);
          }
        }, e => {
          this.loadingCep = false;
          this.enableCepInfos();
        });
      }
    });
  }

  addNewOwner(): void {
    this.ownersForm.push(this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone:  new FormControl('', [Validators.required]),
      birthday:  new FormControl('', [Validators.required]),
      role:  new FormControl('', [Validators.required]),
      cpfcnpj:  new FormControl('', [Validators.required])
    }));
  }

  getError(formControl: FormControl): string {
   if (formControl.errors.required){
    return 'Este campo é requirido.';
   }
   if (formControl.errors.email){
    return 'Insira um e-mail válido.';
   }
   if (formControl.errors.maxlength){
    return `Máximo ${formControl.errors.maxlength.requiredLength} caracteres.`;
   }
   if (formControl.errors.minlength){
    return `Mínimo ${formControl.errors.minlength.requiredLength} caracteres.`;
   }
   if(formControl.errors.pattern){
    return `Url inválido. Ex.: www.website.com.br`;
   }
   if(formControl.errors.NoPassswordMatch) {
    return `As senhas não coincidem.`;
   }
  }

  submit(): void {
    if (this.validateForms() === true){
      this.disabledAll();
      this.customerService.create(this.getJson()).subscribe(r => {
        this.enableAll();
        this.alert(r.message, 'success', false, true);
        setTimeout(() => {
          this.auth.login(this.userForm.value.email, this.userForm.value.password).subscribe(r => {
            this.snack.open('Login efeutado com sucesso.', 'OK', { duration: 1600 });
            this.route.navigate(['/']);
          }, e => {
            this.route.navigate(['/']);
          })
        }, 1200);
      }, e => {
        this.alert(e, 'danger', false, true);
        this.enableAll();
      });
    } else {
     this.move(this.validateForms().step);
     this.alert(this.validateForms().message, 'warning', true);
    }
  }

  disabledAll(): void {
    this.disabled = true;
    this.userForm.disable();
    this.companyForm.disable();
    this.ownersForm.disable();
  }

  enableAll(): void {
    this.disabled = false;
    this.userForm.enable();
    this.companyForm.enable();
    this.ownersForm.enable();
  }

  reset(): void{
    this.alerts = [];
  }

  close(index): void {
    this.alerts.splice(index, 1);
  }

  validateForms(): boolean | any {
      let typeError: object | string = '';
      if (this.userForm.value.fantasy_name === ''){ typeError = { message: 'Insira o nome fantasia!', step: 0 }; }
      else if (this.userForm.value.email === ''){ typeError = { message: 'Insira um e-mail!', step: 0 }; }
      else if (this.userForm.value.website === ''){ typeError = { message: 'Insira o site!', step: 0 }; }
      else if (this.userForm.value.company_name === ''){ typeError = { message: 'Insira o nome fantasia!', step: 0 }; }
      else if (this.userForm.value.cnpj === ''){ typeError = { message: 'Insira o CNPJ!', step: 0 }; }
      else if (this.userForm.value.password === ''){ typeError = { message: 'Insira uma senha!', step: 0 }; }
      else if (this.userForm.value.repeat_password === '') { typeError = { message: 'Reptira sua senha!', step: 0 }; }
      // tslint:disable-next-line: max-line-length
      else if (this.userForm.value.repeat_password != this.userForm.value.password) {
      typeError = { message: 'Confirme sua senha!', step: 0}; }

      else if (this.companyForm.value.cep === ''){ typeError = { message: 'Insira um CEP!', step: 1 }; }
      else if (this.companyForm.value.address === ''){ typeError = { message: 'Insira um endereço!', step: 1 }; }
      else if (this.companyForm.value.number === ''){ typeError = { message: 'Insira um número!', step: 1 }; }
      else if (this.companyForm.value.city === ''){ typeError = { message: 'Insira uma cidade' }; }
      else if (this.companyForm.value.district === '') { typeError = { message: 'Insira um bairro!', step: 1 }; }
      else if (this.companyForm.value.uf === '') { typeError = { message: 'Selecione um estado!', step: 1 }; }

      if(!typeError) {
        for (const [i, form] of this.ownersForm.controls.entries()) {
          const index = i + 1;
          if (form.value.name === '') { typeError = { message: `(${index} próprietario) ` + 'Insira um nome!', step: 2 }; }
          else if (form.value.email === '') { typeError = { message: `(${index} próprietario) ` + 'Insira um e-mail!', step: 2 }; }
          else if (form.value.phone === '') { typeError = { message: `(${index} próprietario) ` + 'Insira um telefone/celular', step: 2 }; }
          // tslint:disable-next-line: max-line-length
          else if (form.value.birthday === '') { typeError = { message: `(${index} próprietario) ` + 'Insira uma data de nascimento!', step: 2 }; }
          else if (form.value.role === '') { typeError = { message: `(${index} próprietario) ` + 'Insira um cargo!', step: 2 }; }
          else if (form.value.cpfcnpj === '') { typeError = { message: `(${index} próprietario) ` + 'Insira um CPF/CNPJ!', step: 2 }; }
        }
      }

      if(typeError !== ''){
        return typeError;
      }
      return true;
  }

  getJson(): object {
    const json = {
      email: this.userForm.value.email,
      fantasy_name: this.userForm.value.fantasy_name,
      website: this.userForm.value.website,
      company_name: this.userForm.value.company_name,
      phone: this.userForm.value.phone,
      cnpj: this.userForm.value.cnpj,
      password: this.userForm.value.password,
      place: {
        cep: this.companyForm.getRawValue().cep,
        address: this.companyForm.getRawValue().address,
        number: this.companyForm.getRawValue().number ,
        complement: this.companyForm.getRawValue().complement,
        city: this.companyForm.getRawValue().city,
        district: this.companyForm.getRawValue().district,
        uf: this.companyForm.getRawValue().uf
      },
      owners: []
    };
    for (const form of this.ownersForm.controls) {
      json.owners.push({
        name: form.value.name,
        email: form.value.email,
        phone:  form.value.phone,
        birthday: form.value.birthday,
        role: form.value.role,
        cpfcnpj: form.value.cpfcnpj
      });
    }
    return json;
  }

  removeOwner(index: number): void{
    this.ownersForm.removeAt(index);
  }

}
