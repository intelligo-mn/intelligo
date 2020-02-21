import { Note } from "./notes";
export declare class NoteService {
    lastId: number;
    notes: Note[];
    constructor();
    addNote(note: Note): NoteService;
    deleteNoteById(id: number): NoteService;
    updateNoteById(id: number, values?: Object): Note;
    getAllNotes(): Note[];
    getNoteById(id: number): Note;
}
