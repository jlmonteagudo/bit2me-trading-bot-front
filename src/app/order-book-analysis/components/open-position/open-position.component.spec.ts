import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenPositionComponent } from './open-position.component';

describe('OpenPositionComponent', () => {
  let component: OpenPositionComponent;
  let fixture: ComponentFixture<OpenPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenPositionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
