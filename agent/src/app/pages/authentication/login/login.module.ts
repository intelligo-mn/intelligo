import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { SharedModule } from "../../../shared/shared.module";
//import { HttpModule } from '@angular/http';


const LOGIN_ROUTE = [{ path: "", component: LoginComponent }];

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule ,SharedModule, RouterModule.forChild(LOGIN_ROUTE)]
})
export class LoginModule {}
