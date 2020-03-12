import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { ChatNodeService } from 'app/entities/chat-node/chat-node.service';
import { IChatNode, ChatNode } from 'app/shared/model/chat-node.model';
import { APIMethod } from 'app/shared/model/enumerations/api-method.model';

describe('Service Tests', () => {
  describe('ChatNode Service', () => {
    let injector: TestBed;
    let service: ChatNodeService;
    let httpMock: HttpTestingController;
    let elemDefault: IChatNode;
    let expectedResult: IChatNode | IChatNode[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ChatNodeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ChatNode(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        APIMethod.GET,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        false,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ChatNode', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new ChatNode())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ChatNode', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            emotion: 'BBBBBB',
            chatNodeType: 'BBBBBB',
            variableName: 'BBBBBB',
            apiMethod: 'BBBBBB',
            apiUrl: 'BBBBBB',
            apiResponseDataRoot: 'BBBBBB',
            nextNodeId: 'BBBBBB',
            requiredVariables: 'BBBBBB',
            groupName: 'BBBBBB',
            cardHeader: 'BBBBBB',
            cardFooter: 'BBBBBB',
            isStartNode: true,
            isGoalNode: true,
            targetBotId: 'BBBBBB',
            targetNodeId: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ChatNode', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            emotion: 'BBBBBB',
            chatNodeType: 'BBBBBB',
            variableName: 'BBBBBB',
            apiMethod: 'BBBBBB',
            apiUrl: 'BBBBBB',
            apiResponseDataRoot: 'BBBBBB',
            nextNodeId: 'BBBBBB',
            requiredVariables: 'BBBBBB',
            groupName: 'BBBBBB',
            cardHeader: 'BBBBBB',
            cardFooter: 'BBBBBB',
            isStartNode: true,
            isGoalNode: true,
            targetBotId: 'BBBBBB',
            targetNodeId: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ChatNode', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
