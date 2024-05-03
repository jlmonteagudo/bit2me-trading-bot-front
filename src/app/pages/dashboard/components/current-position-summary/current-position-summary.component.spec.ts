import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentPositionSummaryComponent } from './current-position-summary.component';

describe('CurrentPositionSummaryComponent', () => {
  let component: CurrentPositionSummaryComponent;
  let fixture: ComponentFixture<CurrentPositionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentPositionSummaryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentPositionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
