"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const core_2 = require("@ngx-translate/core");
let NavbarComponent = class NavbarComponent {
    constructor(translate, location, router) {
        this.translate = translate;
        this.location = location;
        this.router = router;
        this.isCollapsed = true;
        this.yScrollStack = [];
    }
    ngOnInit() {
        this.router.events.subscribe(event => {
            this.isCollapsed = true;
            if (event instanceof router_1.NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            }
            else if (event instanceof router_1.NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                }
                else
                    window.scrollTo(0, 0);
            }
        });
        this.location.subscribe((ev) => {
            this.lastPoppedUrl = ev.url;
        });
    }
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === "#/home") {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === "#/documentation") {
            return true;
        }
        else {
            return false;
        }
    }
};
NavbarComponent = __decorate([
    core_1.Component({
        selector: "app-navbar",
        templateUrl: "./navbar.component.html",
        styleUrls: ["./navbar.component.scss"]
    }),
    __metadata("design:paramtypes", [core_2.TranslateService,
        common_1.Location,
        router_1.Router])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map