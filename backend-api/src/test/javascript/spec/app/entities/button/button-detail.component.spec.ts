import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ButtonDetailComponent } from 'app/entities/button/button-detail.component';
import { Button } from 'app/shared/model/button.model';

describe('Component Tests', () => {
  describe('Button Management Detail Component', () => {
    let comp: ButtonDetailComponent;
    let fixture: ComponentFixture<ButtonDetailComponent>;
    const route = ({ data: of({ button: new Button(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ButtonDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ButtonDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ButtonDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load button on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.button).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
