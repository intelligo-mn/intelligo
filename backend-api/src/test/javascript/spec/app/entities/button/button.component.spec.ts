import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ButtonComponent } from 'app/entities/button/button.component';
import { ButtonService } from 'app/entities/button/button.service';
import { Button } from 'app/shared/model/button.model';

describe('Component Tests', () => {
  describe('Button Management Component', () => {
    let comp: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let service: ButtonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ButtonComponent],
        providers: []
      })
        .overrideTemplate(ButtonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ButtonComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ButtonService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Button(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.buttons && comp.buttons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
