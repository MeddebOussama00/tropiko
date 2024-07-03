import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogetPasswordComponent } from './foget-password.component';

describe('FogetPasswordComponent', () => {
  let component: FogetPasswordComponent;
  let fixture: ComponentFixture<FogetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FogetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FogetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
