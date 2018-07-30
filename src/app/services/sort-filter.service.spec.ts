import {TestBed} from '@angular/core/testing';
import {Item} from '../core/item';
import {SortFilterService} from "./sort-filter.service";
import {FlagType} from "../enums/flags";
import {SortOrder} from "../enums/order";

describe('SortFilterService', () => {
  let item: Item;
  let items: Item[];
  let service: SortFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortFilterService]
    });
    service = TestBed.get(SortFilterService);
    item = new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']});
    items = [
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'apple', 'flags': ['flower', 'flash']}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']}),
      new Item({"name": "orange", "flags": ["heart"]})
    ];
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should filter array by flag', () => {
    const checkedFlags: FlagType[] = [FlagType[FlagType.flash]];
    const actualItems: Item[] = service.filterByFlag(items, checkedFlags);
    items.pop();

    expect(items).toEqual(actualItems);
  });
  it('should filter array by name', () => {
    const searchText = 'an';
    const actualItems: Item[] = service.filterByName(items, searchText);

    expect(actualItems).toContain(items[0]);
    expect(actualItems).toContain(items[3]);
  });
  it('should sort array straight', () => {
    const expectedItems: Item[] = [
      new Item({'name': 'apple', 'flags': ['flower', 'flash']}),
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({"name": "orange", "flags": ["heart"]}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']})
    ];
    const sortOrder: SortOrder = SortOrder.straight;
    const actualItems: Item[] = service.sortItems(items, sortOrder);

    expect(actualItems).toEqual(expectedItems);
  });
  it('should sort array reverse', () => {
    const expectedItems: Item[] = [
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']}),
      new Item({"name": "orange", "flags": ["heart"]}),
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'apple', 'flags': ['flower', 'flash']})
    ];
    const sortOrder: SortOrder = SortOrder.reverse;
    const actualItems: Item[] = service.sortItems(items, sortOrder);

    expect(actualItems).toEqual(expectedItems);
  });
  it('should invert sorting order', () => {
    const cbSortOrder = true;
    const actualSortOrder: SortOrder = service.invertSortOrder(cbSortOrder);

    expect(actualSortOrder).toEqual(SortOrder.straight);
  });
});
