import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryPointLogsComponent } from './entry-point-logs.component';

describe('EntryPointLogsComponent', () => {
  let component: EntryPointLogsComponent;
  let fixture: ComponentFixture<EntryPointLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryPointLogsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryPointLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
