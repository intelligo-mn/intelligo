import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutRoutes } from "./layout.routes";
import { FormsModule } from "@angular/forms";
import { LayoutComponent } from "./layout.component";
import { LeftSidebarComponent } from "./left-sidebar/left-sidebar.component";
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { SearchComponent } from "./top-navbar/search/search.component";
import { RightSidebarComponent } from "./right-sidebar/right-sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { ScrollbarDirective } from "../shared/directives/scrollbar.directive";
import { BaseModule } from "../BaseComponent/base.module"
import { NavDropDownDirectives } from "../shared/directives/nav-dropdown.directive";



@NgModule({
	declarations: [
		LayoutComponent,
		LeftSidebarComponent,
		TopNavbarComponent,
		SearchComponent,
		RightSidebarComponent,
		ScrollbarDirective,
		NavDropDownDirectives
	],
	imports: [
		BaseModule,
		LayoutRoutes,
		CommonModule,
		FormsModule,
		SharedModule.forRoot()
	]
})
export class LayoutModule {}
