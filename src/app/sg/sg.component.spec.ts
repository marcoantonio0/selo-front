import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgComponent } from './sg.component';

describe('SgComponent', () => {
  let component: SgComponent;
  let fixture: ComponentFixture<SgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
