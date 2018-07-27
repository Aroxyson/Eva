import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ItemsComponent} from './items.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Item} from '../item';
import {DndService} from '../services/dnd.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ItemList} from '../enums/itemList';
import {SortFilterService} from '../services/sort-filter.service';
import {RestApiService} from '../services/rest-api.service';
import {FlagType} from '../enums/flags';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let debugElement: DebugElement;
  let dndService: DndService;
  let sortFilterService: SortFilterService;
  let restApiService: RestApiService;
  const item: Item = new Item({'name': '', 'flags': ['flower', 'flash']});

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemsComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
      ]
    });
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dndService = debugElement.injector.get(DndService);
    sortFilterService = debugElement.injector.get(SortFilterService);
    restApiService = debugElement.injector.get(RestApiService);
  });
  it('should call initItem method', async(() => {
    spyOn(component, 'initItems');
    fixture.detectChanges();
    expect(component.initItems).toHaveBeenCalled();
  }));
  it('should emit @Output itemInfo', async(() => {
    component.itemInfoOut.subscribe(i => {
      expect(i).toEqual(item);
    });
    component.setItemInfo(item);
  }));
  it('should bind @Input itemInfo', async(() => {
    component.itemInfo = item;
    expect(component.itemInfo).toEqual(item);
  }));
  it('should call dndService method', () => {
    const event: CustomEvent & { dataTransfer?: DataTransfer } = new CustomEvent('dragstart', { bubbles: true, cancelable: true });
    event.dataTransfer = new DataTransfer();
    const onDragStartSpy = spyOn(dndService, 'onDragStart').and.callThrough();
    component.itemList = ItemList.left;
    component.sortedItems.push(item);
    fixture.detectChanges();
    debugElement
      .query(By.css('.item'))
      .triggerEventHandler('dragstart', event);
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
});
