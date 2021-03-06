import { PersistentVector, PersistentUnorderedMap, storage, logging } from "near-sdk-as";

@nearBindgen
export class User {
  username: string; // la cuenta de near
  id: u32;
  posts: Array<u32>; /* Los id de los posts */

  constructor(username: string) {
    //por que los usuarios deben generar su propio id?, esto esta mas alla de la responsabilidad de un usuario
    const userId = storage.getPrimitive<u32>("userIdGenerator", 0) ;
    
    this.username = username;
    this.id = userId;
    this.posts = [];
    storage.set<u32>("userIdGenerator", userId + 1);
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
    const postId = storage.getPrimitive<u32>("postsIdGenerator", 0);
    logging.log("postId es " + postId.toString());
    this.title = title;
    this.body = body;
    this.date = "12/12/2020";
    
    this.hidden = false;
    this.authorId = authorId;
    this.id = postId;
    
    storage.set<u32>("postsIdGenerator", postId + 1);
    logging.log("postId es " + (postId + 1).toString());
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