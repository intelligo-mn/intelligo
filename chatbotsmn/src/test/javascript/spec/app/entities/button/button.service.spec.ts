import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { ButtonService } from 'app/entities/button/button.service';
import { IButton, Button } from 'app/shared/model/button.model';

describe('Service Tests', () => {
  describe('Button Service', () => {
    let injector: TestBed;
    let service: ButtonService;
    let httpMock: HttpTestingController;
    let elemDefault: IButton;
    let expectedResult: IButton | IButton[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ButtonService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Button(
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        0,
        'AAAAAAA',
        false,
        false,
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
        'AAAAAAA',
        0,
        0,
        false,
        0,
        0,
        'AAAAAAA',
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

      it('should create a Button', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Button())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Button', () => {
        const returnedFromService = Object.assign(
          {
            buttonName: 'BBBBBB',
            buttonText: 'BBBBBB',
            emotion: 1,
            buttonType: 'BBBBBB',
            deepLinkUrl: 'BBBBBB',
            url: 'BBBBBB',
            itemsSource: 'BBBBBB',
            allowMultiple: true,
            bounceTimeout: 1,
            nextNodeId: 'BBBBBB',
            defaultButton: true,
            hidden: true,
            variableValue: 'BBBBBB',
            prefixText: 'BBBBBB',
            postfixText: 'BBBBBB',
            placeholderText: 'BBBBBB',
            conditionMatchKey: 'BBBBBB',
            conditionOperator: 'BBBBBB',
            conditionMatchValue: 'BBBBBB',
            postToChat: true,
            doesRepeat: true,
            repeatOn: 'BBBBBB',
            repeatAs: 'BBBBBB',
            startPosition: 1,
            maxRepeats: 1,
            advancedOptions: true,
            minLength: 1,
            maxLength: 1,
            defaultText: 'BBBBBB',
            isMultiLine: true,
            contentId: 'BBBBBB',
            contentEmotion: 'BBBBBB'
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

      it('should return a list of Button', () => {
        const returnedFromService = Object.assign(
          {
            buttonName: 'BBBBBB',
            buttonText: 'BBBBBB',
            emotion: 1,
            buttonType: 'BBBBBB',
            deepLinkUrl: 'BBBBBB',
            url: 'BBBBBB',
            itemsSource: 'BBBBBB',
            allowMultiple: true,
            bounceTimeout: 1,
            nextNodeId: 'BBBBBB',
            defaultButton: true,
            hidden: true,
            variableValue: 'BBBBBB',
            prefixText: 'BBBBBB',
            postfixText: 'BBBBBB',
            placeholderText: 'BBBBBB',
            conditionMatchKey: 'BBBBBB',
            conditionOperator: 'BBBBBB',
            conditionMatchValue: 'BBBBBB',
            postToChat: true,
            doesRepeat: true,
            repeatOn: 'BBBBBB',
            repeatAs: 'BBBBBB',
            startPosition: 1,
            maxRepeats: 1,
            advancedOptions: true,
            minLength: 1,
            maxLength: 1,
            defaultText: 'BBBBBB',
            isMultiLine: true,
            contentId: 'BBBBBB',
            contentEmotion: 'BBBBBB'
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

      it('should delete a Button', () => {
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
