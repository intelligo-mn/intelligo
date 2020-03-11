import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatFlowDetailComponent } from 'app/entities/chat-flow/chat-flow-detail.component';
import { ChatFlow } from 'app/shared/model/chat-flow.model';

describe('Component Tests', () => {
  describe('ChatFlow Management Detail Component', () => {
    let comp: ChatFlowDetailComponent;
    let fixture: ComponentFixture<ChatFlowDetailComponent>;
    const route = ({ data: of({ chatFlow: new ChatFlow(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatFlowDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChatFlowDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatFlowDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chatFlow on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chatFlow).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
