import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandlesChartComponent } from './candles-chart.component';

describe('CandlesChartComponent', () => {
  let component: CandlesChartComponent;
  let fixture: ComponentFixture<CandlesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandlesChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CandlesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
