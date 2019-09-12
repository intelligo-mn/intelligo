import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  message: string;
  constructor() { }

  ngOnInit() {
  }

  login(){
    this.message = "Хэрэглэгчийн нэр нууц үг буруу байна."
  }
}
