import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {FilterFlagsComponent} from './filter-flags.component';
import {By} from "@angular/platform-browser";

describe('FilterFlagsComponent', () => {
  let component: FilterFlagsComponent;
  let fixture: ComponentFixture<FilterFlagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterFlagsComponent
      ],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(FilterFlagsComponent);
    component = fixture.componentInstance;
  });
  it('should call initFilterFlags method', async(() => {
    spyOn(component, 'initFilterFlags');
    fixture.detectChanges();

    expect(component.initFilterFlags).toHaveBeenCalled();
  }));
  it('should call addToCheckedFlags method on change', async(() => {
    spyOn(component, 'addToCheckedFlags');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#flower'));
    input.triggerEventHandler('change', {target: input.nativeElement});

    expect(component.addToCheckedFlags).toHaveBeenCalled();
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
  it('should change checkedFlags', async(() => {
    const input = document.createElement('input');
    const flag = {name: 'flower', checked: true};
    input.checked = true;
    component.checkedFlags = [];

    component.addToCheckedFlags(input, flag);

    expect(component.checkedFlags.length).toEqual(1);
  }));
});
