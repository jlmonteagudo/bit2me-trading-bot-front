import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastPositionsComponent } from './last-positions.component';

describe('LastPositionsComponent', () => {
  let component: LastPositionsComponent;
  let fixture: ComponentFixture<LastPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastPositionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LastPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
