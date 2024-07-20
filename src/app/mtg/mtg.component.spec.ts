import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MTGComponent } from './mtg.component';

describe('MTGComponent', () => {
  let component: MTGComponent;
  let fixture: ComponentFixture<MTGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MTGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MTGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
