import {TestBed} from '@angular/core/testing';
import {DndService} from './dnd.service';
import {Item} from '../item';
import {ItemList} from '../enums/itemList';

describe('DndService', () => {
  let service: DndService;
  let item: Item;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DndService]
    });
    service = TestBed.get(DndService);
    item = new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']});
  });
  it('should set data in DataTransfer by calling onDragStart', () => {
    const event: CustomEvent & { dataTransfer?: DataTransfer } = new CustomEvent('dragstart');
    event.dataTransfer = new DataTransfer();
    const expectedItem = JSON.stringify(item);
    const expectedItemsList = ItemList[ItemList.left];

    service.onDragStart(event, item, ItemList.left);

    const dataItem = event.dataTransfer.getData('item');
    const dataItemsList = event.dataTransfer.getData('itemList');

    expect(expectedItem).toEqual(dataItem);
    expect(expectedItemsList).toEqual(dataItemsList);
  });
  it('should add value to array by calling onDrop', () => {
    let items: Item[] = [];
    service.dragged = false;
    const event: CustomEvent & { dataTransfer?: DataTransfer } = new CustomEvent('drop');
    event.dataTransfer = new DataTransfer();
    event.dataTransfer.setData( 'item', JSON.stringify(item));
    event.dataTransfer.setData('itemList', ItemList[ItemList.left]);

    service.onDrop(event, items, ItemList.right);

    expect(items).toContain(item);
    expect(service.dragged).toEqual(true);
  });
  it('should reduce array by calling onDragEnd', () => {
    let items: Item[] = [item];
    service.dragged = true;

    service.onDragEnd(items, item);

    expect(items).not.toContain(item);
  });
});
