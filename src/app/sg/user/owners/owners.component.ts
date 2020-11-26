import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  ownersForm =  new FormArray([]);
  timeinterval: any;
  alerts = [];
  loading = false;
  constructor(
    private sAuth: AuthenticationService,
    private sUser: UserService,
    private fb: FormBuilder,
    private title: Title
  ) {
    this.title.setTitle('Proprietários');
    this.sUser.getOwners(this.sAuth.currentUserValue.id).subscribe(r => {
      for (const owner of r) {
        this.ownersForm.push(this.fb.group({
          name: new FormControl(owner.name, [Validators.required, Validators.maxLength(255)]),
          email: new FormControl(owner.email, [Validators.required, Validators.email]),
          phone:  new FormControl(owner.phone, [Validators.required]),
          birthday:  new FormControl(owner.birthday, [Validators.required]),
          role:  new FormControl(owner.role, [Validators.required, Validators.maxLength(255)]),
          cpfcnpj:  new FormControl(owner.cpfcnpj, [Validators.required])
        }));
      }
    });
  }

  ngOnInit(): void {

  }

  public alert(message, type: 'warning'|'danger'|'success',  timeout = false, clear = false, array?: ''): void {
    if(this.timeinterval){
      clearInterval(this.timeinterval);
    }
    if(clear){
      this.alerts = [];
    }
    this.alerts.push({type, message});
    if(timeout) {
      this.timeinterval = setInterval(() => {
        this.alerts.pop();
      }, 2500);
    }
  }

  getJson(){
    const json = [];
    for (const form of this.ownersForm.controls) {
      json.push({
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

  close(index): void {
    this.alerts.splice(index, 1);
  }

  updateOwners(){
    if(this.checkErros() === true) {
      this.loading = true;
      this.sUser.putOwners(this.sAuth.currentUserValue.id, { owners: this.getJson() }).subscribe(r => {
        this.loading = false;
        this.alert(r.message, 'success', true, true);
      }, e => {
        this.loading = false;
        this.alert(e, 'danger', false, true);
      });
    } else{
      this.alert(this.checkErros(), 'warning', true, true);
    }

  }

  checkErros(){
    let typeError;
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
    if(typeError) return typeError.message;
    else return true;
  }

  removeOwner(index: number): void{
    this.ownersForm.removeAt(index);
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

}
