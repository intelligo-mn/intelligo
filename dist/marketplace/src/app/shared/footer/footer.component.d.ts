import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
export declare class FooterComponent implements OnInit {
    private router;
    test: Date;
    constructor(router: Router);
    ngOnInit(): void;
    getPath(): string;
}
