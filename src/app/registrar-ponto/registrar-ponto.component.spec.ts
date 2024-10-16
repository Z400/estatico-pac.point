import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPontoComponent } from './registrar-ponto.component';

describe('RegistrarPontoComponent', () => {
  let component: RegistrarPontoComponent;
  let fixture: ComponentFixture<RegistrarPontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPontoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarPontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
