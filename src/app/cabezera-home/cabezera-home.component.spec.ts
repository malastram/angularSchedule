import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabezeraHomeComponent } from './cabezera-home.component';

describe('CabezeraHomeComponent', () => {
  let component: CabezeraHomeComponent;
  let fixture: ComponentFixture<CabezeraHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CabezeraHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabezeraHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
