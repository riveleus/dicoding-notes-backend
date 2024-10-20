import { Request, ResponseToolkit } from "@hapi/hapi";
import { nanoid } from "nanoid";
import { notes } from "./notes";

export const addNoteHandler = (request: Request, h: ResponseToolkit) => {
    const { title, tags, body } = request.payload as any;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote);

    const isSuccess = notes.find(note => note.id === id) !== undefined;

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

export const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

export const getNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const note = notes.find(note => note.id === id);

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

export const editNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload as any;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index >= 0) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        console.log(notes[index]);
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

export const deleteNoteByIdHandler = (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index >= 0) {
        notes.splice(index, 1);
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