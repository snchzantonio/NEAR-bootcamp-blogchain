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
    logging.log(user.username);
    logging.log(user.id);
    logging.log(user.blogs.last);
    logging.log(newBlog.id);
    logging.log(newBlog.authorId);
    logging.log(newBlog.title);
    logging.log(newBlog.body);
    return;
  } // Si el usuario no existe
  
  const newUser = new User(sender);
  const newBlog = new Blog(title, body, newUser.id);

  blogs.set(newBlog.id, newBlog);
  newUser.blogs.push(newBlog.id);
  users.set(sender, newUser);


  logging.log("Se creo usuario y se anadio un nuevo blog")
  logging.log(newUser.id);
  logging.log(newUser.username);
  logging.log(newUser.blogs.last);
  logging.log(newBlog.id);
  logging.log(newBlog.authorId);
  logging.log(newBlog.title);
  logging.log(newBlog.body);
}

export function getBlogs(amount: u32): Array<Blog> {
  // if(amount == 0 || amount < -1) {
  //   assert(false, "No puedes pedir cero blogs o usar un numero menor que -1");
  //   return [];
  // }

  var blogsArray = new Array<Blog>();
  const blogslength = storage.getPrimitive<u32>("blogsIdGenerator", 0); // obtener la cantidad de blogs publicados

  if(amount == 0) { // 0 significa todos
    for(let i:u32 = 0; i <= blogslength; i++) {
      logging.log(i);
      const blog = blogs.get(i)
      if(blog) {
        logging.log("Paso " + i.toString());
        blogsArray.push(blog);
      }
    }
    
    return blogsArray.reverse();
  }

  if(amount > blogslength) {
    assert(false, "La cantidad requerida supera a la existente")
    return [];
  }

  for(let i:u32 = blogslength; i > (blogslength - amount); i--) { // obtener los ultimos x blogs
    logging.log(i);
    const blog = blogs.get(i)
    if(blog) {
      logging.log("Paso " + i.toString());
      blogsArray.push(blog);
    }
  }
  
  return blogsArray;
}