import { Context, context, logging, storage } from "near-sdk-as";
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
export function publishPost(title: string, body: string): u32 {
  const sender = context.sender;
  // se podria reemplazar con let user = users.get(sender, new User(sender)); ?
  let user: User;

  if (users.contains(sender)) {
    logging.log("El usuario ya existe: " + sender);
    user = users.getSome(sender);
  } else {
    logging.log("Creando nuevo usuario: " + sender);
    user = new User(sender);
  }

  const newPost = new Post(title, body, user.id);
  logging.log("Se creo el post con id: " + newPost.id.toString());
  posts.set(newPost.id, newPost);
  user.posts.push(newPost.id);
  users.set(sender, user);
  return newPost.id;
}


/**
 * Obtiene una lista de posts.  
 * Los posts se obtiene desde el final hasta el principio.  
 * @param amount La cantidad de post que se deben obtener
 * @param at El indice desde donde se obtendran los posts
 * @returns 
 */
export function getPosts(amount: u32, at: u32 = 0, includeHidden: boolean = false): Array<Post> {


  var postsArray = new Array<Post>();
  const postslength = storage.getPrimitive<u32>("postsIdGenerator", 0); // obtener la cantidad de posts publicados

  if (at > postslength) {
    return [];
  }

  if (amount == 0) {
    amount = postslength;
  }

  for (let current: u32 = at === 0 ? 1 : at; amount > 0; amount--) {
    const post = posts.get(current);
    current++;
    if (post === null) { continue; } //los indices nunca se eliminan, si nos encontramos un null hemos sobrepasado el array
    if (post.hidden && !includeHidden) { //solo incluir los ocultos si se solicita, de lo contrario no contamos el post y continuamos
      amount++;
      continue;
    }
    postsArray.push(post);
  }

  return postsArray;

}

export function hidePost(at: u32 = 0, hide: boolean = true): void {
  let post = posts.get(at);
  if (post) {
    post.hidden = hide;
    posts.set(at, post);
    return;
  }
  assert(false, at.toString() + " id no existe")

}

export function getPostsByUser(username: string): Array<Post> {
  const user = users.get(username);
  let postsArray = new Array<Post>();
  if (user) {
    for (let i = 0; i < user.posts.length; i++) {
      postsArray.push(posts.getSome(user.posts[i]));
    }

    return postsArray;
  }
  assert(false, "No se encontro usuario");
  return [];
}

export function getPostById(postId: u32): Post | null {
  const post = posts.get(postId);
  if (post) {
    return (!post.hidden) ? post : null;
  }

  return null;
}