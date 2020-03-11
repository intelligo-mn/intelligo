import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ButtonUpdateComponent } from 'app/entities/button/button-update.component';
import { ButtonService } from 'app/entities/button/button.service';
import { Button } from 'app/shared/model/button.model';

describe('Component Tests', () => {
  describe('Button Management Update Component', () => {
    let comp: ButtonUpdateComponent;
    let fixture: ComponentFixture<ButtonUpdateComponent>;
    let service: ButtonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ButtonUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ButtonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ButtonUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ButtonService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Button(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Button();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
