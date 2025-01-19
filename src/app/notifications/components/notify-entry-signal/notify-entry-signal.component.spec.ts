import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifyEntrySignalComponent } from './notify-entry-signal.component';

describe('NotifyEntrySignalComponent', () => {
  let component: NotifyEntrySignalComponent;
  let fixture: ComponentFixture<NotifyEntrySignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyEntrySignalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifyEntrySignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
