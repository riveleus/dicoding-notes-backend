"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteByIdHandler = exports.editNoteByIdHandler = exports.getNoteByIdHandler = exports.getAllNotesHandler = exports.addNoteHandler = void 0;
const nanoid_1 = require("nanoid");
const notes_1 = require("./notes");
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = (0, nanoid_1.nanoid)(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes_1.notes.push(newNote);
    const isSuccess = notes_1.notes.find(note => note.id === id) !== undefined;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};
exports.addNoteHandler = addNoteHandler;
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes: notes_1.notes,
    },
});
exports.getAllNotesHandler = getAllNotesHandler;
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes_1.notes.find(note => note.id === id);
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};
exports.getNoteByIdHandler = getNoteByIdHandler;
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = notes_1.notes.findIndex((note) => note.id === id);
    if (index >= 0) {
        notes_1.notes[index] = Object.assign(Object.assign({}, notes_1.notes[index]), { title,
            tags,
            body,
            updatedAt });
        console.log(notes_1.notes[index]);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
exports.editNoteByIdHandler = editNoteByIdHandler;
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes_1.notes.findIndex((note) => note.id === id);
    if (index >= 0) {
        notes_1.notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
exports.deleteNoteByIdHandler = deleteNoteByIdHandler;
