import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatFlowComponent } from './chatflow/chatflow.component';
import { NodeEditorComponent } from './nodeeditor/nodeeditor.component';
import { SimulatorFrameComponent } from './simulator-frame/simulator-frame.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../../shared.module';
import { AuthGuard } from 'src/app/core/auth.guard';

export const STUDIO_ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'designer',
    component: ChatFlowComponent
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
