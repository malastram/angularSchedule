import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiPruebaComponent } from './api-prueba.component';

describe('ApiPruebaComponent', () => {
  let component: ApiPruebaComponent;
  let fixture: ComponentFixture<ApiPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
