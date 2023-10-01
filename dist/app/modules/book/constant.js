"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSearchableFields = exports.bookFilterableFields = void 0;
const bookSearchableFields = [
    "title",
    "author",
    "genre",
    "price",
    "minPrice",
    "maxPrice",
];
exports.bookSearchableFields = bookSearchableFields;
const bookFilterableFields = ["searchTerm", "id"];
exports.bookFilterableFields = bookFilterableFields;
