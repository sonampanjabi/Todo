import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TODOItemComponent } from './todoitem.component';

describe('TODOItemComponent', () => {
  let component: TODOItemComponent;
  let fixture: ComponentFixture<TODOItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TODOItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TODOItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
