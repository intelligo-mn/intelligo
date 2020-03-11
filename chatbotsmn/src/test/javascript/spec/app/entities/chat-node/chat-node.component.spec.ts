import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatNodeComponent } from 'app/entities/chat-node/chat-node.component';
import { ChatNodeService } from 'app/entities/chat-node/chat-node.service';
import { ChatNode } from 'app/shared/model/chat-node.model';

describe('Component Tests', () => {
  describe('ChatNode Management Component', () => {
    let comp: ChatNodeComponent;
    let fixture: ComponentFixture<ChatNodeComponent>;
    let service: ChatNodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatNodeComponent],
        providers: []
      })
        .overrideTemplate(ChatNodeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatNodeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatNodeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChatNode(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chatNodes && comp.chatNodes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
