import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatProjectComponent } from 'app/entities/chat-project/chat-project.component';
import { ChatProjectService } from 'app/entities/chat-project/chat-project.service';
import { ChatProject } from 'app/shared/model/chat-project.model';

describe('Component Tests', () => {
  describe('ChatProject Management Component', () => {
    let comp: ChatProjectComponent;
    let fixture: ComponentFixture<ChatProjectComponent>;
    let service: ChatProjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatProjectComponent],
        providers: []
      })
        .overrideTemplate(ChatProjectComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatProjectComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatProjectService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChatProject(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chatProjects && comp.chatProjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
