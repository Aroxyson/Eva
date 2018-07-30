import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SortFilterService} from './services/sort-filter.service';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Item} from './core/item';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AppComponent',  () => {
  let fixture: ComponentFixture<AppComponent>;
  let sortFilterService: SortFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        SortFilterService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AppComponent);
    sortFilterService = TestBed.get(SortFilterService);
  });
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));
  it('should have child components', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelectorAll('filter-flags').length).toBe(1);
    expect(compiled.querySelectorAll('items').length).toBe(2);
  }));
  it('should bind Input value to ngModel', () => {
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#inputName')).nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#inputName')).nativeElement.value).toEqual('test');
  });
  it('should call invertSortOrder method of sortFilterService',async(() => {
    fixture.detectChanges();

    const invertSortOrderSpy = spyOn(sortFilterService, 'invertSortOrder');
    const inputCheckbox = fixture.debugElement.query(By.css('#sortOrder'));
    inputCheckbox.nativeElement.checked = true;
    inputCheckbox.triggerEventHandler('change', {target: inputCheckbox.nativeElement});

    expect(invertSortOrderSpy).toHaveBeenCalledWith(true);
  }));
  it('should call setItemInfo method by itemInfoOut event ', async(() => {
    fixture.detectChanges();
    const setItemInfoSpy = spyOn(fixture.componentInstance, 'setItemInfo');
    const element = fixture.debugElement.query(By.css('items'));
    element.triggerEventHandler('itemInfoOut', {target: element.nativeElement});

    expect(setItemInfoSpy).toHaveBeenCalled();
  }));
  it('should call setCheckedFlags method by itemInfoOut event ', async(() => {
    fixture.detectChanges();
    const setCheckedFlagsSpy = spyOn(fixture.componentInstance, 'setCheckedFlags');
    const element = fixture.debugElement.query(By.css('filter-flags'));
    element.triggerEventHandler('checkedFlagsOut', {target: element.nativeElement});

    expect(setCheckedFlagsSpy).toHaveBeenCalled();
  }));
  it('should show infoItem in INFO', async(() => {
    const item: Item = new Item({'name': 'banana', 'flags': ['flower', 'flash']});
    fixture.componentInstance.itemInfo = item;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('#itemInfoName'));

    expect(element.nativeElement.textContent).toContain(item.name);
  }));
});
