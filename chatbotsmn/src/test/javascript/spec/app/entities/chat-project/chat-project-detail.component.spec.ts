import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatProjectDetailComponent } from 'app/entities/chat-project/chat-project-detail.component';
import { ChatProject } from 'app/shared/model/chat-project.model';

describe('Component Tests', () => {
  describe('ChatProject Management Detail Component', () => {
    let comp: ChatProjectDetailComponent;
    let fixture: ComponentFixture<ChatProjectDetailComponent>;
    const route = ({ data: of({ chatProject: new ChatProject(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatProjectDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChatProjectDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatProjectDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chatProject on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chatProject).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
