import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from './../../_services/authentication.service';
import { SeloService } from './../../_services/selo.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-selo',
  templateUrl: './selo.component.html',
  styleUrls: ['./selo.component.scss']
})
export class SeloComponent implements OnInit {
  public seloImg;
  public selo;
  constructor(
    private sSelo: SeloService,
    @Inject(PLATFORM_ID) private platformId,
    private sAuth: AuthenticationService,
    private snack:MatSnackBar
  ) {
    this.sSelo.getSelo(this.sAuth.currentUserValue.id).subscribe(r => {
      this.seloImg = r;
    }, e => {
      console.log(e);
    })
    this.sSelo.getSeloInfo(this.sAuth.currentUserValue.id).subscribe(r => {
      this.selo = r;
    })
  }

  copy(id: string){
  if(isPlatformBrowser(this.platformId)){
    const val = document.getElementById(id).textContent
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snack.open('Copiado para área de transferencia.', 'OK', { duration: 1200 });
    }
  }

  ngOnInit(): void {
  }

}
