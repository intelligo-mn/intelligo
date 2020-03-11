import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'chat-project',
        loadChildren: () => import('./chat-project/chat-project.module').then(m => m.ChatbotsmnChatProjectModule)
      },
      {
        path: 'chat-flow',
        loadChildren: () => import('./chat-flow/chat-flow.module').then(m => m.ChatbotsmnChatFlowModule)
      },
      {
        path: 'chat-node',
        loadChildren: () => import('./chat-node/chat-node.module').then(m => m.ChatbotsmnChatNodeModule)
      },
      {
        path: 'section',
        loadChildren: () => import('./section/section.module').then(m => m.ChatbotsmnSectionModule)
      },
      {
        path: 'button',
        loadChildren: () => import('./button/button.module').then(m => m.ChatbotsmnButtonModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ChatbotsmnEntityModule {}
