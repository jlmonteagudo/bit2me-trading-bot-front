import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentPositionDetailComponent } from './current-position-detail.component';

describe('CurrentPositionDetailComponent', () => {
  let component: CurrentPositionDetailComponent;
  let fixture: ComponentFixture<CurrentPositionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentPositionDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentPositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
