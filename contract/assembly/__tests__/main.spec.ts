import {
  publishPost,
  getPosts,
  hidePost,
  getPostsByUser
} from '../main';

import { context, logging, storage, VM } from 'near-sdk-as';

describe("BlogChain ", () => {
  it("publishBlog", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";
    const cantidadDePublicaciones = 4;
    for (let i = 0; i < cantidadDePublicaciones; i++) {
      publishPost(title, body);
    }
  
    const blogs = getPosts(0);
  
    expect(blogs.length).toBe(cantidadDePublicaciones, "La cantidad de publicaciones debe ser " + cantidadDePublicaciones.toString());
  });
  it("hidePost", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";
    const cantidadDePublicaciones = 4;
    for (let i = 0; i < cantidadDePublicaciones; i++) {
      publishPost(title, body);
    }
    hidePost(4);
    const blogs = getPosts(0);
  
    expect(blogs.length).toBe(3, "La cantidad de publicaciones debe ser 3");
  });
  it("getPostsByUser", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";
    const cantidadDePublicaciones = 4;
    for (let i = 0; i < cantidadDePublicaciones; i++) {
      publishPost(title, body);
    }
    hidePost(4);
    const blogs = getPostsByUser(context.sender);
    expect(blogs[2].title).toBe(title, "El titulo debe coincidir");
  });
});


