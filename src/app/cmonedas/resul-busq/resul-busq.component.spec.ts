import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResulBusqComponent } from './resul-busq.component';

describe('ResulBusqComponent', () => {
  let component: ResulBusqComponent;
  let fixture: ComponentFixture<ResulBusqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResulBusqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResulBusqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
