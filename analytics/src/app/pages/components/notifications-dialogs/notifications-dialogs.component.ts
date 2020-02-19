import { Component} from '@angular/core';
import swal from 'sweetalert2';

@Component({
	selector: '.content_inner_wrapper',
	templateUrl: './notifications-dialogs.component.html',
	styleUrls: ['./notifications-dialogs.component.scss']
})
export class NotificationsDialogsComponent {
	//Header Title us <h1 innerHtml="{{title}}"></h1> for HTML ampersand.
	title: string = 'Alerts &amp; Dialogs';
	
	sweetMessage() {
		swal(`Here's a simple message`);
	}
	sweetError() {
		swal({
			title: 'Error!',
			text: 'Do you want to continue',
			type: 'error',
			confirmButtonText: 'Cool'
		})
	}
	sweetSuccess() {
		swal("Good job!", "You clicked the button!", "success");
	}
	sweetText() {
		swal({
			title: 'Input something',
			input: 'text',
			showCancelButton: true,
			inputValidator: function(value) {
				return new Promise(function(resolve, reject) {
					if (value) {
						resolve()
					} else {
						reject('You need to write something!')
					}
				})
			}
		}).then(function(result) {
			swal({
				type: 'success',
				html: 'You entered: ' + result
			})
		}).catch(swal.noop)
	}
	sweetEmail() {
		swal({
			title: 'Input email address',
			input: 'email'
		}).then(function(email) {
			swal({
				type: 'success',
				html: 'Entered email: ' + email
			})
		}).catch(swal.noop)
	}
	
	sweetUrl() {
		swal({
			title: 'Input URL',
			input: 'url'
		}).then(function(url) {
			swal({
				type: 'success',
				html: 'Entered URL: ' + url
			})
		}).catch(swal.noop)
	}
	
	
	sweetTextarea() {
		swal({
			input: 'textarea',
			showCancelButton: true
		}).then(function(text) {
			if (text) {
				swal(text)
			}
		}).catch(swal.noop)
	}
	
}
