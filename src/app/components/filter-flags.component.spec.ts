import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {FilterFlagsComponent} from './filter-flags.component';

describe('FilterFlagsComponent', () => {
  let component: FilterFlagsComponent;
  let fixture: ComponentFixture<FilterFlagsComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterFlagsComponent
      ],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(FilterFlagsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });
  it('should call initFilterFlags method', async(() => {
    spyOn(component, 'initFilterFlags');
    fixture.detectChanges();
    expect(component.initFilterFlags).toHaveBeenCalled();
  }));
  it('should initialize FilterFlags', async(() => {
    fixture.detectChanges();
    expect(component.filterFlags).not.toEqual([]);
  }));
  it('should emit checkedFlagsOut', async(() => {
    fixture.detectChanges();
    component.checkedFlags.push(component.filterFlags[0].name);
    component.checkedFlagsOut.subscribe(i => {
      expect(i).toEqual(component.checkedFlags);
    });
    component.sendCheckedFlags();
  }));
  it('should call addToCheckedFlags method and change checkedFlags', async(() => {
    const input = document.createElement('input');
    const flag = {name: 'flower', checked: true};
    component.checkedFlags = [];
    input.checked = true;
    component.addToCheckedFlags(input, flag);
    expect(component.checkedFlags.length).toEqual(1);
  }));
});
