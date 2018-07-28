import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ItemsComponent} from './items.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Item} from '../item';
import {DndService} from '../services/dnd.service';
import {DebugElement, NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ItemList} from '../enums/itemList';
import {SortFilterService} from '../services/sort-filter.service';
import {RestApiService} from '../services/rest-api.service';
import {FlagType} from '../enums/flags';
import {SortOrder} from '../enums/order';

fdescribe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let debugElement: DebugElement;
  let dndService: DndService;
  let sortFilterService: SortFilterService;
  let restApiService: RestApiService;
  const item: Item = new Item({'name': 'banana', 'flags': ['flower', 'flash']});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemsComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dndService = debugElement.injector.get(DndService);
    sortFilterService = debugElement.injector.get(SortFilterService);
    restApiService = debugElement.injector.get(RestApiService);
  }));
  it('should call initItem method', async(() => {
    spyOn(component, 'initItems');
    fixture.detectChanges();
    expect(component.initItems).toHaveBeenCalled();
  }));
  it('should call dndService method', () => {
    const event: CustomEvent & { dataTransfer?: DataTransfer } = new CustomEvent('dragstart', { bubbles: true, cancelable: true });
    event.dataTransfer = new DataTransfer();
    const onDragStartSpy = spyOn(dndService, 'onDragStart').and.callThrough();
    component.sortedItems.push(item);
    fixture.detectChanges();
    debugElement.query(By.css('.item')).triggerEventHandler('dragstart', event);
    expect(onDragStartSpy).toHaveBeenCalled();
  });
  it('should call restApiService method', () => {
    const receiveItemsSpy = spyOn(restApiService, 'receiveItems').and.callThrough();
    fixture.detectChanges();
    expect(receiveItemsSpy).toHaveBeenCalled();
  });
  it('should call sortFilterService method', () => {
    const filterByFlagSpy = spyOn(sortFilterService, 'filterByFlag').and.callThrough();
    component.items = [
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'apple', 'flags': ['flower', 'flash']}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']})
    ];
    const checkedFlags: FlagType[] = [FlagType[FlagType.flash]];
    component.setRightList(checkedFlags);
    expect(filterByFlagSpy).toHaveBeenCalled();
  });
  it('should return filtered and sorted left list', () => {
    component.items = [
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'apple', 'flags': ['flower', 'flash']}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']})
    ];
    const filteredItem = [new Item({'name': 'apple', 'flags': ['flower', 'flash']})];
    const expected = component.setLeftList(SortOrder.reverse, 'app');
    expect(expected).toEqual(filteredItem);
  });
  it('should return filtered right list', () => {
    component.items = [
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'apple', 'flags': ['flower']}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']})
    ];
    const checkedFlags: FlagType[] = [FlagType[FlagType.flash]];
    const expected = [
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']})
    ];
    const actual = component.setRightList(checkedFlags);
    expect(actual).toEqual(expected);
  });
  it('should emit @Output itemInfo', async(() => {
    fixture.detectChanges();
    component.itemInfoOut.subscribe(i => {
      expect(i).toEqual(item);
    });
    component.setItemInfo(item);
  }));
  it('should add class depending on the @Input itemInfo', async(() => {
    component.itemInfo = item;
    component.sortedItems.push(item);
    fixture.detectChanges();
    const element = debugElement.query(By.css('.item'));
    expect(element.nativeElement.classList).toContain('border-danger');
  }));
  it('should not change sortedItems', async(() => {
    fixture.detectChanges();
    component.itemList = ItemList.right;
    component.sortedItems = [
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'apple', 'flags': ['flower']}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']})
    ];
    const expected = component.sortedItems;
    component.checkedFlags = [FlagType[FlagType.flash]];
    component.ngOnChanges({
      itemInfo: new SimpleChange(null, [],false)
    });
    expect(component.sortedItems).toEqual(expected);
  }));
});
