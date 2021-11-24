import { context, PersistentUnorderedMap } from "near-sdk-as";

@nearBindgen
export class User {
  id: number;
  username: string; // la cuenta de near
  blogs: Array<number /* Los id de los blogs */>;

  constructor(username: string) {
  }
}

@nearBindgen
export class Blog {
  title: string;
  body: string; // El cuerpo del articulo debe ser en markdown para el estelizado
  date: string;

  author: number; // id del autor
  id: number;
  //likes: number;
  //disLikes: number;

  constructor() {
  }
}

/*
  Podemos hacer un tabla de datos tipo sql, de tener relaciones con los id.
  Los blogs tienen sus id, los usuarios tienen sus id.
*/

export const users = new PersistentUnorderedMap<string, User>("users");
export const blogs = new PersistentUnorderedMap<string, Blog>("blogs");