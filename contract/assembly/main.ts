import { context, logging } from "near-sdk-as";
import {Blog, User, blogs, users} from "./models"

export function publishBlog(title: string, body: string): void {
  const sender = context.sender;
  if(users.contains(sender)) { // Si el usuario ya existe
    var user = users.getSome(sender);
    const newBlog = new Blog(title, body, user.id);

    blogs.set(user.id, newBlog);
    user.blogs.push(newBlog.id);

    return;
  } // Si el usuario no existe
  
  const newUser = new User(sender);
  const newBlog = new Blog(title, body, newUser.id);

  blogs.set(newBlog.id, newBlog);
  newUser.blogs.push(newBlog.id);

  users.set(newUser.username, newUser);
}

