import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperateSimulationComponent } from './operate-simulation.component';

describe('OperateSimulationComponent', () => {
  let component: OperateSimulationComponent;
  let fixture: ComponentFixture<OperateSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperateSimulationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OperateSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
