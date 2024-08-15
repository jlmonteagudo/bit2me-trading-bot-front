import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderBookAnalysisComponent } from './order-book-analysis.component';

describe('OrderBookAnalysisComponent', () => {
  let component: OrderBookAnalysisComponent;
  let fixture: ComponentFixture<OrderBookAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBookAnalysisComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderBookAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
