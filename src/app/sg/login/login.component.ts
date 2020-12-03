import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  hide = true;
  alerts: any[];
  public hasError = false;
  public typeError = '';
  public error: any;
  private returnUrl: any;
  public disabled: boolean = false;
  public isLoading: boolean = false;
  constructor(
    private sAuthentication: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {
    this.title.setTitle(`Login | ${environment.pageTitle}`);
    this.reset();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app';
  }

  reset() {
    this.alerts = [];
  }

  close(index) {
    this.alerts.splice(index, 1);
  }

  public showError(error, type: 'warning'|'danger'): void {
    this.alerts.pop();
    this.alerts.push({type, error});
  }

  public loading(): void {
    this.disabled = true;
    this.isLoading = true;
    this.loginForm.disable();
  }

  public removeLoading(): void {
    this.disabled = false;
    this.isLoading = false;
    this.loginForm.enable();
  }

  public checkError(): boolean {
    if (this.loginForm.value.email === '') {
      this.showError('Insira um e-mail.', 'warning');
      return false;
    }
    if ( this.loginForm.value.password === ''){
      this.showError('Insira uma senha.', 'warning');
      return false;
    }
   return true;
  }

  public loginSubmit(): void {
    if(this.checkError()){
      this.loading();
      this.sAuthentication.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 250);
      }, e => {
        this.removeLoading();
        this.showError(e, 'danger');
      });
    }
  }

}
