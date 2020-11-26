import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuSiteComponent } from './meu-site.component';

describe('MeuSiteComponent', () => {
  let component: MeuSiteComponent;
  let fixture: ComponentFixture<MeuSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeuSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
