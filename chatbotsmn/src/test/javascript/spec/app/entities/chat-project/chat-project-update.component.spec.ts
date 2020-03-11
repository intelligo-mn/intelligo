import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatProjectUpdateComponent } from 'app/entities/chat-project/chat-project-update.component';
import { ChatProjectService } from 'app/entities/chat-project/chat-project.service';
import { ChatProject } from 'app/shared/model/chat-project.model';

describe('Component Tests', () => {
  describe('ChatProject Management Update Component', () => {
    let comp: ChatProjectUpdateComponent;
    let fixture: ComponentFixture<ChatProjectUpdateComponent>;
    let service: ChatProjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatProjectUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChatProjectUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatProjectUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatProjectService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChatProject(123);
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
        const entity = new ChatProject();
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
