import { Injectable } from "@angular/core";
import { Note } from "./notes";

@Injectable()
export class NoteService {
	// Placeholder for last id so we can simulate
	// automatic incrementing of id's
	lastId: number = 0;

	// Placeholder for notes
	notes: Note[] = [];

	constructor() {
		if (!localStorage.getItem("notes")) {
			localStorage.setItem("notes", JSON.stringify([]));
		}
	}

	// Simulate POST /notes
	addNote(note: Note): NoteService {
		if (this.notes.length) {
			this.lastId = this.notes[this.notes.length - 1].id;
		}
		if (!note.id) {
			note.id = ++this.lastId;
		}
		this.notes.push(note);
		localStorage.setItem("notes", JSON.stringify(this.notes));
		return this;
	}

	// Simulate DELETE /notes/:id
	deleteNoteById(id: number): NoteService {
		this.notes = this.notes.filter(note => note.id !== id);
		localStorage.setItem("notes", JSON.stringify(this.notes));
		return this;
	}

	// Simulate PUT /notes/:id
	updateNoteById(id: number, values: Object = {}): Note {
		let note = this.getNoteById(id);
		if (!note) {
			return null;
		}
		Object.assign(note, values);
		localStorage.setItem("notes", JSON.stringify(this.notes));
		return note;
	}

	// Simulate GET /notes
	getAllNotes(): Note[] {
		let notes = JSON.parse(localStorage.getItem("notes"));
		if (notes) {
			this.notes = notes;
		} else {
			this.notes = [];
		}
		return this.notes;
	}

	// Simulate GET /notes/:id
	getNoteById(id: number): Note {
		return this.notes.filter(note => note.id === id).pop();
	}
}
