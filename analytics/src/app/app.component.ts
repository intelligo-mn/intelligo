import {
	Component,
	HostBinding,
	OnInit,
	HostListener,
	ViewContainerRef
} from "@angular/core";
import { Title } from "@angular/platform-browser";
declare var $: any;
import { GlobalState } from "./app.state";
import { ConfigService } from "./shared/services/config/config.service";
import { PreloaderService } from "./shared/services/preloader/preloader.service";
import { SpinnerService } from "./shared/services/spinner/spinner.service";
import { ThemesService } from "./shared/services/themes/themes.service";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { DataService } from "./shared/services/data/data.service";
@Component({
	selector: "app-root",
	template: "<router-outlet></router-outlet>",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	businessId: string;
	//App Left Sidebar Menu Open/Close Desktop
	@HostBinding("class.app_sidebar-menu-collapsed")
	get isApp_SidebarLeftCollapsed() {
		return this.config.appLayout.isApp_SidebarLeftCollapsed;
	}
	//Left Menu Sidebar Open/Close Tablet & Mobile
	@HostBinding("class.app_sidebar-left-open")
	get isApp_MobileSidebarLeftOpen() {
		return this.config.appLayout.isApp_MobileSidebarLeftOpen;
	}
	//App Right Sidebar Open/Close
	@HostBinding("class.sidebar-overlay-open")
	get isApp_SidebarRightOpen() {
		return this.config.appLayout.isApp_SidebarRightOpen;
	}

	
	

	//The constructor is called first time before the ngOnInit()
	//The constructor should only be used to initialize class members but shouldn't do actual "work".
	//So you should use constructor() to setup Dependency Injection and not much else.
	constructor(
		private _data:DataService,
		private _state: GlobalState,
		public config: ConfigService,
		private viewContainerRef: ViewContainerRef,
		private _spinner: SpinnerService,
		private titleService: Title,
		private themesService: ThemesService
	) { }
	public setTitle(newTitle: string) {
		this.titleService.setTitle(newTitle);
	}
	//called after the constructor and called  after the first ngOnChanges()
	//ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
	ngOnInit() {
		//localStorage.clear()
		//	$(document).on("click", '[href="#"]', e => e.preventDefault());
	}
	//check if menu should reset on resize
	@HostListener("window:resize")
	public onWindowResize(): void {
		if (this._shouldMenuReset()) {
			this.config.appLayout.isApp_SidebarLeftCollapsed = false;
		}
	}

	private _shouldMenuReset(): boolean {
		return window.innerWidth <= this.config.breakpoint.desktopLG;
	}

	public ngAfterViewInit(): void {
		PreloaderService.load().then(values => {
			this._spinner.hide();
		});
	}
}
