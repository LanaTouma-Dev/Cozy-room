import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ambience } from './ambience';

describe('Ambience', () => {
  let component: Ambience;
  let fixture: ComponentFixture<Ambience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ambience]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ambience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
