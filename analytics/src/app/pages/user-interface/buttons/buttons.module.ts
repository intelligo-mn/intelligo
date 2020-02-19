import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonsComponent } from "./buttons.component";
import { SharedModule } from "../../../shared/shared.module";

const BUTTONS_ROUTE = [{ path: "", component: ButtonsComponent }];

@NgModule({
	declarations: [ButtonsComponent],
	imports: [CommonModule, SharedModule, RouterModule.forChild(BUTTONS_ROUTE)]
})
export class ButtonsModule {}
