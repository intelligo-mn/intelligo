import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatNodeUpdateComponent } from 'app/entities/chat-node/chat-node-update.component';
import { ChatNodeService } from 'app/entities/chat-node/chat-node.service';
import { ChatNode } from 'app/shared/model/chat-node.model';

describe('Component Tests', () => {
  describe('ChatNode Management Update Component', () => {
    let comp: ChatNodeUpdateComponent;
    let fixture: ComponentFixture<ChatNodeUpdateComponent>;
    let service: ChatNodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatNodeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChatNodeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatNodeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatNodeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChatNode(123);
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
        const entity = new ChatNode();
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
