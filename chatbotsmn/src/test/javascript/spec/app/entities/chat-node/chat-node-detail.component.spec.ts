import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { ChatNodeDetailComponent } from 'app/entities/chat-node/chat-node-detail.component';
import { ChatNode } from 'app/shared/model/chat-node.model';

describe('Component Tests', () => {
  describe('ChatNode Management Detail Component', () => {
    let comp: ChatNodeDetailComponent;
    let fixture: ComponentFixture<ChatNodeDetailComponent>;
    const route = ({ data: of({ chatNode: new ChatNode(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [ChatNodeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChatNodeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatNodeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chatNode on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chatNode).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
