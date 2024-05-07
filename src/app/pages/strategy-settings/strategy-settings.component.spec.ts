import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrategySettingsComponent } from './strategy-settings.component';

describe('StrategySettingsComponent', () => {
  let component: StrategySettingsComponent;
  let fixture: ComponentFixture<StrategySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategySettingsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StrategySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
