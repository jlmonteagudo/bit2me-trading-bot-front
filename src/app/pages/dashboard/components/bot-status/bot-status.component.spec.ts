import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotStatusComponent } from './bot-status.component';

describe('BotStatusComponent', () => {
  let component: BotStatusComponent;
  let fixture: ComponentFixture<BotStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotStatusComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BotStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
