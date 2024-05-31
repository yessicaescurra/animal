import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalEditPage } from './animal-edit.page';

describe('AnimalEditPage', () => {
  let component: AnimalEditPage;
  let fixture: ComponentFixture<AnimalEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
