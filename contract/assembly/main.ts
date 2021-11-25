import { context, logging, storage } from "near-sdk-as";
import {Post, User, posts, users} from "./models"

export function clean(): void {
  posts.clear();
  users.clear();
  storage.set<u32>("userIdGenerator", 0);
  storage.set<u32>("postsIdGenerator", 0);
}

export function publishPost(title: string, body: string): void {
  const sender = context.sender;
  if(users.contains(sender)) { // Si el usuario ya existe
    var user = users.getSome(sender);
    const newPost = new Post(title, body, user.id);

    posts.set(newPost.id, newPost);
    user.posts.push(newPost.id);

    logging.log("Se anadio un nuevo blog")
    // logging.log(user.username);
    // logging.log(user.id);
    // logging.log(user.posts.last);
    // logging.log(newPost.id);
    // logging.log(newPost.authorId);
    // logging.log(newPost.title);
    // logging.log(newPost.body);
    return;
  } // Si el usuario no existe
  
  const newUser = new User(sender);
  const newPost = new Post(title, body, newUser.id);

  posts.set(newPost.id, newPost);
  newUser.posts.push(newPost.id);
  users.set(sender, newUser);


  logging.log("Se creo usuario y se anadio un nuevo blog")
  // logging.log(newUser);
  // logging.log(newUser.username);
  // logging.log(newUser.posts.last);
  // logging.log(newPost.id);
  // logging.log(newPost.authorId);
  // logging.log(newPost.title);
  // logging.log(newPost.body);
}

export function getPosts(amount: u32, at: u32 = 0): Array<Post> {
  var postsArray = new Array<Post>();
  const postslength = storage.getPrimitive<u32>("postsIdGenerator", 0); // obtener la cantidad de posts publicados

  if(amount > postslength || at > postslength || (at + amount) > postslength ) {
    assert(false, "La cantidad requerida supera a la existente")
    return [];
  }

  if(amount == 0) { // 0 significa todos
    for(let i:u32 = 0; i <= postslength; i++) {
      const blog = posts.get(i)
      if(blog) {
        postsArray.push(blog);
      }
    }
    
    return postsArray.reverse();
  }

  for(let i:u32 = postslength - at; i > ((postslength - at) - amount); i--) { // obtener los ultimos x posts
    const blog = posts.get(i)
    if(blog) {
      postsArray.push(blog);
    }
  }
  
  return postsArray;
}