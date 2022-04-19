import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDefaultPageComponent } from './chat-default-page.component';

describe('ChatDefaultPageComponent', () => {
  let component: ChatDefaultPageComponent;
  let fixture: ComponentFixture<ChatDefaultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatDefaultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDefaultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
