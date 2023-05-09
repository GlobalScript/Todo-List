import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCaseComponent } from './todo-case.component';

describe('TodoCaseComponent', () => {
  let component: TodoCaseComponent;
  let fixture: ComponentFixture<TodoCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoCaseComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
