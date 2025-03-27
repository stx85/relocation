import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RelocationRequestBackendService } from './relocation-request-backend.service';
import { RelocationRequest } from './interfaces/relocation-request';

describe('RelocationRequestBackendService', () => {
  let service: RelocationRequestBackendService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RelocationRequestBackendService
      ]
    });

    service = TestBed.inject(RelocationRequestBackendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true on successful POST request', (done) => {
    const requestData: Partial<RelocationRequest> = {
      clientName: 'Max Mustermann',
      fromCity: 'Berlin',
      toCity: 'Hamburg',
      relocationDate: new Date()
    };

    service.sendRelocationRequest(requestData).subscribe(result => {
      expect(result).toBeTrue();
      done();
    });

    const req = httpMock.expectOne('http://localhost:8090/request');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestData);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush({ id: 1, ...requestData });
  });

  it('should return false on HTTP error', (done) => {
    const requestData: Partial<RelocationRequest> = {
      clientName: 'Error Case'
    };

    service.sendRelocationRequest(requestData).subscribe(result => {
      expect(result).toBeFalse();
      done();
    });

    const req = httpMock.expectOne('http://localhost:8090/request');
    expect(req.request.method).toBe('POST');

    req.error(new ErrorEvent('Network error'), { status: 500 });
  });
});
