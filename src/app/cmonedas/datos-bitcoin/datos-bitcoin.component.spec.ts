import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBitcoinComponent } from './datos-bitcoin.component';

describe('DatosBitcoinComponent', () => {
  let component: DatosBitcoinComponent;
  let fixture: ComponentFixture<DatosBitcoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBitcoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
