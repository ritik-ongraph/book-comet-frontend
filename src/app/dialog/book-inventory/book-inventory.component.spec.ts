import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInventoryComponent } from './book-inventory.component';

describe('BookInventoryComponent', () => {
  let component: BookInventoryComponent;
  let fixture: ComponentFixture<BookInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
