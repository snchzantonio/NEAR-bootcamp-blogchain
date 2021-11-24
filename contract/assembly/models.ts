import { context, PersistentUnorderedMap, storage } from "near-sdk-as";

const MAX_USER_POSTS = 10000;

@nearBindgen
export class User {
  username: string; // la cuenta de near
  id: number;
  blogs: Array<number /* Los id de los blogs */>;

  constructor(username: string) {
    const userId = storage.getPrimitive<i32>("userIdGenerator", 0) + 1;
    storage.set<i32>("userIdGenerator", userId);

    this.username = context.sender;
    this.id = userId;
    this.blogs = new Array<number>(MAX_USER_POSTS);
  }
}

@nearBindgen
export class Blog {
  title: string;
  body: string; // El cuerpo del articulo debe ser en markdown para el estelizado
  date: string;

  id: number;
  authorId: number; // id del autor
  //likes: number;
  //disLikes: number;

  constructor(title: string, body: string, authorId: number/*, date: string*/) {
    const blogId = storage.getPrimitive<i32>("blogsIdGenerator", 0) + 1;
    storage.set<i32>("blogsIdGenerator", blogId);

    this.title = title;
    this.body = body;
    this.date = "12/12/2020";

    this.authorId = authorId;
    this.id = blogId;
  }
}

/*
  Podemos hacer un tabla de datos tipo sql, de tener relaciones con los id.
  Los blogs tienen sus id, los usuarios tienen sus id.
*/

export const users = new PersistentUnorderedMap<string, User>("users");
export const blogs = new PersistentUnorderedMap<number, Blog>("blogs");