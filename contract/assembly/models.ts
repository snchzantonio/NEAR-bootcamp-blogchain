import { PersistentVector, PersistentSet, PersistentUnorderedMap, storage } from "near-sdk-as";

@nearBindgen
export class User {
  username: string; // la cuenta de near
  id: u32;
  blogs: PersistentVector<u32>; /* Los id de los blogs */

  constructor(username: string) {
    const userId = storage.getPrimitive<u32>("userIdGenerator", 0) + 1;
    storage.set<u32>("userIdGenerator", userId);

    this.username = username;
    this.id = userId;
    this.blogs = new PersistentVector<u32>(this.username + "_blogsIDs");
  }
}

@nearBindgen
export class Blog {
  title: string;
  body: string; // El cuerpo del articulo debe ser en markdown para el estelizado
  date: string;

  id: u32;
  authorId: u32; // id del autor
  //likes: u32;
  //disLikes: u32;

  constructor(title: string, body: string, authorId: u32/*, date: string*/) {
    const blogId = storage.getPrimitive<u32>("blogsIdGenerator", 0) + 1;
    storage.set<u32>("blogsIdGenerator", blogId);

    this.title = title;
    this.body = body;
    this.date = "12/12/2020";

    this.authorId = authorId;
    this.id = blogId;
  }
}

export let users = new PersistentUnorderedMap<string, User>("users"); // string es la cuenta de NEAR de usuasio
export let blogs = new PersistentUnorderedMap<u32, Blog>("blogs"); //u32 es el id del blog