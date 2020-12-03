import { CustomerService } from './../_services/customer.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  private timeinterval;
  alerts: any[] = [];
  public registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  public cpfForm = new FormGroup({
    cpf: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  });
  public currentStep = 1;
  public steps = [];
  constructor(
    private snack: MatSnackBar,
    private auth: AuthenticationService,
    private route: Router,
    private sCustomer: CustomerService,
    private title: Title
  ) {
    this.title.setTitle(`Cadastre-se | ${environment.pageTitle}`);
    this.cpfForm.controls['gender'].setValue('M');
  }

  currentSteps(): any{
    this.steps = [];
    for (let i = 0; i < this.currentStep; i++) {
      this.steps.push({
        status: true
      });
    }
    for (let i = 0; i < (3-this.currentStep); i++) {
      this.steps.push({
        status: false
      });
    }
  }

  ngOnInit(): void {
    this.currentSteps();
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

  goStep(step: number){
    this.currentStep = step;
    this.currentSteps();
  }



  submitStep(step: number){
    if (this.currentStep == step && step == 1) {
      if(!this.registerForm.invalid){
        this.currentStep = 2;
        this.currentSteps();
      } else {
        this.alert('Confira todos os campos antes de continuar.', 'warning', true, true);
      }
    }
    if (this.currentStep == step && step == 2) {
      if(!this.cpfForm.invalid){
        this.sCustomer.create({
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          cpf: this.cpfForm.value.cpf,
          gender: this.cpfForm.value.gender
        }).subscribe(r => {
          this.currentStep = 3;
          this.currentSteps();
        }, e => {
          this.alert('Houve um erro ao cadastrar!', 'danger', true, true);
        })
      } else {
        this.alert('Confira todos os campos antes de continuar.', 'warning', true, true);
      }
    }
  }

  reset(): void{
    this.alerts = [];
  }

  close(index): void {
    this.alerts.splice(index, 1);
  }





}
