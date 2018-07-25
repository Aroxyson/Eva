import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ItemsComponent} from './items.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Item} from '../item';
import {DndService} from '../services/dnd.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ItemList} from '../enums/itemList';
import {SortFilterService} from '../services/sort-filter.service';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let debugElement: DebugElement;
  let dndService: DndService;
  let sortFilterService: SortFilterService;
  const item: Item = new Item({'name': '', 'flags': ['flower', 'flash']});

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemsComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dndService = debugElement.injector.get(DndService);
    sortFilterService = debugElement.injector.get(SortFilterService);
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
    component.itemList = ItemList.left;
    component.items.push(item);
    fixture.detectChanges();
    const onDragStartSpy = spyOn(dndService, 'onDragStart').and.callThrough();
    debugElement
      .query(By.css('.itemsLeft'))
      .triggerEventHandler('dragstart', null);
    fixture.detectChanges();
    expect(onDragStartSpy).toHaveBeenCalled();
  });
  it('should call sortFilterService method', () => {
    component.itemList = ItemList.left;
    component.items.push(item);
    fixture.detectChanges();
    const getSortOrderSpy = spyOn(sortFilterService, 'getSortOrder').and.callThrough();
    fixture.detectChanges();
    expect(getSortOrderSpy).toHaveBeenCalled();
  });
});
