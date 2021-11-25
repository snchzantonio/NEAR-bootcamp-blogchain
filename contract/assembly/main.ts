import { context, logging, storage } from "near-sdk-as";
import {Blog, User, blogs, users} from "./models"

export function clean(): void {
  blogs.clear();
  users.clear();
  storage.set<u32>("userIdGenerator", 0);
  storage.set<u32>("blogsIdGenerator", 0);
}

export function publishBlog(title: string, body: string): void {
  const sender = context.sender;
  if(users.contains(sender)) { // Si el usuario ya existe
    var user = users.getSome(sender);
    const newBlog = new Blog(title, body, user.id);

    blogs.set(newBlog.id, newBlog);
    user.blogs.push(newBlog.id);

    logging.log("Se anadio un nuevo blog")
    // logging.log(user.username);
    // logging.log(user.id);
    // logging.log(user.blogs.last);
    // logging.log(newBlog.id);
    // logging.log(newBlog.authorId);
    // logging.log(newBlog.title);
    // logging.log(newBlog.body);
    return;
  } // Si el usuario no existe
  
  const newUser = new User(sender);
  const newBlog = new Blog(title, body, newUser.id);

  blogs.set(newBlog.id, newBlog);
  newUser.blogs.push(newBlog.id);
  users.set(sender, newUser);


  logging.log("Se creo usuario y se anadio un nuevo blog")
  // logging.log(newUser);
  // logging.log(newUser.username);
  // logging.log(newUser.blogs.last);
  // logging.log(newBlog.id);
  // logging.log(newBlog.authorId);
  // logging.log(newBlog.title);
  // logging.log(newBlog.body);
}

export function getBlogs(amount: u32, at: u32 = 0): Array<Blog> {
  var blogsArray = new Array<Blog>();
  const blogslength = getNumOfBlogs(); // obtener la cantidad de blogs publicados

  if(amount > blogslength || at > blogslength || (at + amount) > blogslength ) {
    assert(false, "La cantidad requerida supera a la existente")
    return [];
  }

  if(amount == 0) { // 0 significa todos
    for(let i:u32 = 0; i <= blogslength; i++) {
      const blog = blogs.get(i)
      if(blog) {
        blogsArray.push(blog);
      }
    }
    
    return blogsArray.reverse();
  }

  for(let i:u32 = blogslength - at; i > ((blogslength - at) - amount); i--) { // obtener los ultimos x blogs
    const blog = blogs.get(i)
    if(blog) {
      blogsArray.push(blog);
    }
  }
  
  return blogsArray;
}

export function getNumOfBlogs(): u32 {
  return storage.getPrimitive<u32>("blogsIdGenerator", 0);
}