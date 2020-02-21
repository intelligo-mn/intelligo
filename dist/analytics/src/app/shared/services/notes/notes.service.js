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
let NoteService = class NoteService {
    constructor() {
        this.lastId = 0;
        this.notes = [];
        if (!localStorage.getItem("notes")) {
            localStorage.setItem("notes", JSON.stringify([]));
        }
    }
    addNote(note) {
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
    deleteNoteById(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        return this;
    }
    updateNoteById(id, values = {}) {
        let note = this.getNoteById(id);
        if (!note) {
            return null;
        }
        Object.assign(note, values);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        return note;
    }
    getAllNotes() {
        let notes = JSON.parse(localStorage.getItem("notes"));
        if (notes) {
            this.notes = notes;
        }
        else {
            this.notes = [];
        }
        return this.notes;
    }
    getNoteById(id) {
        return this.notes.filter(note => note.id === id).pop();
    }
};
NoteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NoteService);
exports.NoteService = NoteService;
//# sourceMappingURL=notes.service.js.map