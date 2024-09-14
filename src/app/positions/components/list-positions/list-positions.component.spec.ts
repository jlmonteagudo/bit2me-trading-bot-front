import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPositionsComponent } from './list-positions.component';

describe('ListPositionsComponent', () => {
  let component: ListPositionsComponent;
  let fixture: ComponentFixture<ListPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPositionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
