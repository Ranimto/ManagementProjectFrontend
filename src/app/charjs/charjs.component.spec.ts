import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharjsComponent } from './charjs.component';

describe('CharjsComponent', () => {
  let component: CharjsComponent;
  let fixture: ComponentFixture<CharjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
