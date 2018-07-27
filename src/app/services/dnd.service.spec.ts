import {TestBed} from '@angular/core/testing';
import {DndService} from './dnd.service';
import {Item} from '../item';
import {ItemList} from '../enums/itemList';

describe('DndService', () => {
  let service: DndService;
  let item: Item;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [DndService]
    });
    service = TestBed.get(DndService);
    item = new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']});
  });
  it('should call onDragStart method', () => {
    const element = document.createElement('div');
    const event: CustomEvent & { dataTransfer?: DataTransfer } = new CustomEvent('dragstart');
    const onDragStartSpy = spyOn(service, 'onDragStart').and.callThrough();
    event.dataTransfer = new DataTransfer();

    element.addEventListener('dragstart', e => {service.onDragStart(e, item, ItemList.left); });
    element.dispatchEvent(event);

    expect(onDragStartSpy).toHaveBeenCalled();
  });
  it('should change dragged after calling onDrop', () => {
    const items: Item[] = [];
    service.dragged = false;
    const element = document.createElement('div');
    const event: CustomEvent & { dataTransfer?: DataTransfer } = new CustomEvent('drop');
    const onDropSpy = spyOn(service, 'onDrop').and.callThrough();
    event.dataTransfer = new DataTransfer();

    event.dataTransfer.items.add(JSON.stringify(item), 'item');
    event.dataTransfer.items.add(ItemList[ItemList.left], 'itemList');
    element.addEventListener('drop', e => {service.onDrop(e,  items, ItemList.right); });
    element.dispatchEvent(event);

    expect(onDropSpy).toHaveBeenCalled();
    expect(service.dragged).toEqual(true);
  });
  it('should change dragged after calling onDragEnd', () => {
    const items: Item[] = [];
    items.push(item);
    service.dragged = true;
    const element = document.createElement('div');
    const event: CustomEvent & { dataTransfer?: DataTransfer } = new CustomEvent('dragend');
    const onDragEndSpy = spyOn(service, 'onDragEnd').and.callThrough();
    event.dataTransfer = new DataTransfer();

    element.addEventListener('dragend', e => {service.onDragEnd(items, item); });
    element.dispatchEvent(event);

    expect(onDragEndSpy).toHaveBeenCalled();
    expect(service.dragged).toEqual(false);
  });
});
