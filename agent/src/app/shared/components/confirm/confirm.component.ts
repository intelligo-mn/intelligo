import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public confirmMessage: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit() {
  }

}
