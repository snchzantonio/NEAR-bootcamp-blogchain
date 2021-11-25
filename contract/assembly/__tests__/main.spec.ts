import {
  publishBlog,
  getBlogs
} from '../main';

import { context, logging, storage, VM } from 'near-sdk-as';

describe("BlogChain ", () => {
  it("publishBlog", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";
    const cantidadDePublicaciones = 4;
    for (let i = 0; i < cantidadDePublicaciones; i++) {
      publishBlog(title, body);
    }
  
    const blogs = getBlogs(0);
  
    expect(blogs.length).toBe(cantidadDePublicaciones, "La cantidad de publicaciones debe ser " + cantidadDePublicaciones.toString());
  });
  it("publishBlog titulo", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";

    publishBlog(title, body);

    const blogs = getBlogs(0);

    expect(blogs[0].title).toBe(title, "El titulo del blog debe coincidir");
  });
  it("publishBlog body", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";

    publishBlog(title, body);

    const blogs = getBlogs(0);

    expect(blogs[0].body).toBe(body, "El body del blog debe coincidir");
  });
});


