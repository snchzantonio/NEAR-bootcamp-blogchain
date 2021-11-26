import { Context, context, logging, storage } from "near-sdk-as";
import { Post, User, posts, users } from "./models"

export function clean(): void {
  posts.clear();
  users.clear();
  storage.set<u32>("userIdGenerator", 0);
  storage.set<u32>("postsIdGenerator", 0);
  const postId = storage.getPrimitive<u32>("postsIdGenerator", 0);

  logging.log("resertar postid a " + postId.toString());
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
 * @param includeHidden true para incluir los post ocultos
 * @returns 
 */
export function getPosts(amount: u32, at: u32 = 0, includeHidden: boolean = false): Array<Post> {


  var postsArray = new Array<Post>();
  const postslength = storage.getPrimitive<u32>("postsIdGenerator", 0); // obtener la cantidad de posts publicados

  if (at > postslength || postslength == 0) {
    return [];
  }

  if (amount == 0) {
    amount = postslength;
  }

  for (let current: u32 = at ; amount > 0; amount--) {
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

/**
 * Oculta o desoculta un post.  
 * Un post oculto no aparece en los resultados de las funciones que buscan posts a menos que se pase el parametro `includeHidden` a true.
 * @param at indice del post que se quiere ocultar/desocultar
 * @param hide true para ocultar, false para desocultar
 * @returns 
 */
export function hidePost(at: u32 = 0, hide: boolean = true): void {
  let post = posts.get(at);
  if (post) {
    post.hidden = hide;
    posts.set(at, post);
    return;
  }
  assert(false, at.toString() + " id no existe")

}


/**
 * Obtiene todos los post de un usuario.  
 * Los posts se obtiene desde el final hasta el principio.  
 * @param username Direccion del usuario del que se quieren conseguir los posts
 * @param includeHidden true para incluir los post ocultos
 * @returns Un array que contiene los posts del usuario, puede estar vacio si el usuario no tiene posts
 */
export function getPostsByUser(username: string, includeHidden: boolean = false): Array<Post> {
  const user = users.get(username);
  let postsArray = new Array<Post>();
  if (user) {
    for (let i = 0; i < user.posts.length; i++) {
      const currentPost = posts.getSome(user.posts[i]);
      if (currentPost.hidden && !includeHidden) {
        continue;
      }
      postsArray.push(currentPost);
    }

    return postsArray;
  }
  assert(false, "No se encontro usuario");
  return [];
}

/**
 * Obtiene un post.  
 * @param postId Direccion del usuario del que se quieren conseguir los posts
 * @param includeHidden true para incluir los post ocultos
 * @returns El post o `null` en caso de no encontrarlo
 */
export function getPostById(postId: u32, includeHidden: boolean = false): Post | null {
  const post = posts.get(postId);
  if (!post || (post.hidden && !includeHidden)) { return null; }
  return null;
}