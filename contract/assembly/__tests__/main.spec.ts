import {
  publishBlog,
  getBlogs
} from '../main';

import { context, logging, storage, VM } from 'near-sdk-as';

describe("BlogChain ", () => {
  it("Debio de publicarse el post y coincidir", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";
    const cantidadDePublicaciones = 4;

    for(let i = 0; i < cantidadDePublicaciones; i++) {
      publishBlog(title, body);
    }

    const blogs = getBlogs(0);

    expect(blogs.length).toBe(cantidadDePublicaciones, "Cantidad de publicaciones debe coincidir a la publicada");
  });
});


