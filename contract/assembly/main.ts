import { context, logging, storage } from "near-sdk-as";
import { Post, User, posts, users } from "./models"

export function clean(): void {
  posts.clear();
  users.clear();
  storage.set<u32>("userIdGenerator", 0);
  storage.set<u32>("postsIdGenerator", 0);
}

/**
 * Agrega un nuevo Post.  
 * El post creado se vinculara al address que lo publica
 * @param title titulo del post
 * @param body  contenido del post
 */
export function publishPost(title: string, body: string): void {
  const sender = context.sender;
  // se podria reemplazar con let user = users.get(sender, new User(sender)); ?
  let user;

  if (users.contains(sender)) {
    logging.log(`Creando nuevo usuario: ${sender}`);
    user = new User(sender);
    users.set(sender, user);
  } else {
    user = users.getSome(sender);
  }

  const newPost = new Post(title, body, user.id);
  posts.set(newPost.id, newPost);
  user.posts.push(newPost.id);

}

/**
 * Obtiene una lista de posts.  
 * Los posts se obtiene desde el final hasta el principio.  
 * @param amount La cantidad de post que se deben obtener
 * @param at El indice desde donde se obtendran los posts
 * @returns 
 */
export function getPosts(amount: u32, at: u32 = 0): Array<Post> {
  var postsArray = new Array<Post>();
  const postslength = storage.getPrimitive<u32>("postsIdGenerator", 0); // obtener la cantidad de posts publicados

  if (amount > postslength || at > postslength || (at + amount) > postslength) {
    assert(false, "La cantidad requerida supera a la existente")
    return [];
  }

  if (amount == 0) {
    amount = postslength;
  }

  for (let current: u32 = at; amount > 0; amount--) {
    const post = posts.get(current);
    if (post === null) { break; }
    postsArray.push(post);
  }

  return postsArray;
}