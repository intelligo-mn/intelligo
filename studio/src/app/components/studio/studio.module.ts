import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChatFlowComponent } from './chatflow/chatflow.component';
import { LandingComponent } from './landing/landing.component';
import { NodeEditorComponent } from './nodeeditor/nodeeditor.component';
import { SimulatorFrameComponent } from './simulator-frame/simulator-frame.component';

export const STUDIO_ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'designer',
    component: ChatFlowComponent,
  },
];

@NgModule({
  declarations: [
    ChatFlowComponent,
    NodeEditorComponent,
    SimulatorFrameComponent,
    LandingComponent,
  ],
  entryComponents: [NodeEditorComponent],
  imports: [SharedModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class StudioModule {}
