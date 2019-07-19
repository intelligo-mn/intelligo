import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  // Form Validator
  ngOnInit() {
  	this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      message: ['', Validators.required]
    })
  }

}
