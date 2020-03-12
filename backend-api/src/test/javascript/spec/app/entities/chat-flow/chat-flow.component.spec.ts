import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatFlowComponent } from 'app/entities/chat-flow/chat-flow.component';
import { ChatFlowService } from 'app/entities/chat-flow/chat-flow.service';
import { ChatFlow } from 'app/shared/model/chat-flow.model';

describe('Component Tests', () => {
  describe('ChatFlow Management Component', () => {
    let comp: ChatFlowComponent;
    let fixture: ComponentFixture<ChatFlowComponent>;
    let service: ChatFlowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatFlowComponent],
        providers: []
      })
        .overrideTemplate(ChatFlowComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatFlowComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatFlowService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChatFlow(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chatFlows && comp.chatFlows[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
