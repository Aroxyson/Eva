import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RestApiService} from './rest-api.service';
import {Item} from '../item';

describe('RestApiService', () => {
  let http: HttpTestingController;
  let service: RestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [RestApiService]
    }).compileComponents();
    service = TestBed.get(RestApiService);
    http = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have made one request to GET data from expected URL', () => {
    const expectedData: Item[] = [
      new Item({'name': 'banana', 'flags': ['flower', 'heart', 'sun', 'flash']}),
      new Item({'name': 'apple', 'flags': ['flower', 'flash']}),
      new Item({'name': 'watermelon', 'flags': ['heart', 'sun', 'flash']})
    ];
    service.receiveItems().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });
    const req = http.expectOne(service.URL);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);
  });
});