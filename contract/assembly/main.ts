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
  let user: User;

  if (users.contains(sender)) {
    user = users.getSome(sender);
  } else {
    logging.log("Creando nuevo usuario: " + sender); // aqui no existen string template
    user = new User(sender);
    users.set(sender, user);
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
export function getPosts(amount: u32, at: u32 = 0, includeHidden: boolean = false): Array<Post> {
  var postsArray = new Array<Post>();
  const postslength = storage.getPrimitive<u32>("postsIdGenerator", 0); // obtener la cantidad de posts publicados

  if (amount > postslength || at > postslength || (at + amount) > postslength) {
    assert(false, "La cantidad requerida supera a la existente")
    return [];
  }

  if (amount == 0) {
    amount = postslength;
  }

  for (let current: u32 = at === 0 ? 1 : at; amount > 0; amount--) {
    logging.log("Itero por " + current.toString())
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

export function hidePost(at: u32 = 0): void {
  let post = posts.get(at);
  if(post) {
    post.hidden = true;
    posts.set(at, post);
    logging.log(posts.getSome(at))
    return;
  }
  assert(false, at.toString() + " id no existe")

  
  return blogsArray;
}