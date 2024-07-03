import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedCartComponent } from './updated-cart.component';

describe('UpdatedCartComponent', () => {
  let component: UpdatedCartComponent;
  let fixture: ComponentFixture<UpdatedCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatedCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
