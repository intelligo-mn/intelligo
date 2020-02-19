import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { ConfigService } from '../../shared/services/config/config.service';

@Component({
    selector: '.footer_wrapper',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
		 encapsulation: ViewEncapsulation.Emulated,
})
export class FooterComponent implements OnInit {


    ngOnInit() {

    }

}
