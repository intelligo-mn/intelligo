import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { GlobalState } from "../../../app.state";
import { ConfigService } from "../../../shared/services/config/config.service";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: ".content_inner_wrapper",
  templateUrl: "./modals.component.html",
  styleUrls: ["./modals.component.scss"]
})
export class ModalsComponent implements OnInit {

  @Input() title: string;
  @Input() hidden: boolean = false;
  @Input() isValid: boolean = true;
  @Input() showNext: boolean = true;
  @Input() showPrev: boolean = true;

  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();

  language: string[] = ["English", "French", "German"];
  myform: FormGroup;



  private _isActive: boolean = false;
  isDisabled: boolean = true;
  closeResult: string;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };


  constructor(private modalService: NgbModal) { }
  @Input("isActive")
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
  }

  get isActive(): boolean {
    return this._isActive;
  }
  isCompleted: boolean = false;

  onStep1Next(event) {
    console.log("Step1 - Next");
  }

  onStep2Next(event) {
    console.log("Step2 - Next");
  }

  onStep3Next(event) {
    console.log("Step3 - Next");
  }

  onComplete(event) {
    this.isCompleted = true;
  }

  onStepChanged(step) {
    console.log("Changed to " + step.title);
  }
  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required)
      }),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      language: new FormControl(),
      address: new FormGroup({
        addressOne: new FormControl("", Validators.required),
        addressTwo: new FormControl("", Validators.required)
      }),
      city: new FormControl()
    });
  }
  openFullscreen(fullscreen) {
    this.modalService.open(fullscreen, { windowClass: 'fullscreen custom-show' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openBottomSheetModal(bottomSheetModal) {
    this.modalService.open(bottomSheetModal, { windowClass: 'bottom-sheet custom-show' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open(param) {
    this.modalService.open(param, { windowClass: 'custom-show' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
