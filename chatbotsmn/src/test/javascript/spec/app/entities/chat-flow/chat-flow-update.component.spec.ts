import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatFlowUpdateComponent } from 'app/entities/chat-flow/chat-flow-update.component';
import { ChatFlowService } from 'app/entities/chat-flow/chat-flow.service';
import { ChatFlow } from 'app/shared/model/chat-flow.model';

describe('Component Tests', () => {
  describe('ChatFlow Management Update Component', () => {
    let comp: ChatFlowUpdateComponent;
    let fixture: ComponentFixture<ChatFlowUpdateComponent>;
    let service: ChatFlowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatFlowUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChatFlowUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatFlowUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatFlowService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChatFlow(123);
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
        const entity = new ChatFlow();
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
