import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostPerformantMarketsComponent } from './most-performant-markets.component';

describe('MostPerformantMarketsComponent', () => {
  let component: MostPerformantMarketsComponent;
  let fixture: ComponentFixture<MostPerformantMarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostPerformantMarketsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MostPerformantMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
