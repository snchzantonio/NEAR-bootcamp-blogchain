import { PersistentVector, PersistentSet, PersistentUnorderedMap, storage } from "near-sdk-as";

@nearBindgen
export class User {
  username: string; // la cuenta de near
  id: u32;
  posts: PersistentVector<u32>; /* Los id de los posts */

  constructor(username: string) {
    //por que los usuarios deben generar su propio id?, esto esta mas alla de la responsabilidad de un usuario
    const userId = storage.getPrimitive<u32>("userIdGenerator", 0) + 1;
    storage.set<u32>("userIdGenerator", userId);

    this.username = username;
    this.id = userId;
    this.posts = new PersistentVector<u32>(this.username + "_postsIDs");
  }
}

/**
 * Un post del blog
 */
@nearBindgen
export class Post {
  title: string;
  body: string; // El cuerpo del articulo debe ser en markdown para el estelizado
  date: string;
  hidden: boolean;

  id: u32;
  authorId: u32; // id del autor
  //likes: u32;
  //disLikes: u32;

  constructor(title: string, body: string, authorId: u32/*, date: string*/) {
    //por que los posts deben generar su propio id?, esto esta mas alla de la responsabilidad de un post
    const postId = storage.getPrimitive<u32>("postsIdGenerator", 0) + 1;
    storage.set<u32>("postsIdGenerator", postId);

    this.title = title;
    this.body = body;
    this.date = "12/12/2020";
    this.hidden = false;

    this.authorId = authorId;
    this.id = postId;
  }
}

/**
 * string es la cuenta de NEAR de usuasio
*/
export let users = new PersistentUnorderedMap<string, User>("users");

/**
 * u32 es el id del blog
 */
export let posts = new PersistentUnorderedMap<u32, Post>("posts");