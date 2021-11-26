import {
  publishPost,
  getPosts,
  getPostById,
  getPostsByUser
} from '../main';

import { context, logging, storage, VM } from 'near-sdk-as';

describe("BlogChain ", () => {
  it("publishPost body", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";

    publishPost(title, body);

    const blogs = getPosts(0);

    expect(blogs[0].body).toBe(body, "El body del blog debe coincidir");
  });
  it("getPostById", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";

    publishPost(title, body);

    const blog1 = getPostById(0); // los id comienzan por 1, por lo que 0 no existe!
    expect(blog1).toBeNull("El post debe ser null");
  });
  it("getPostsByUser", () => {
    const title = "Hola mundo";
    const body = "Que agradable dia";

    publishPost(title, body);

    const blogs = getPostsByUser(context.sender); // los id comienzan por 1, por lo que 0 no existe!
    expect(blogs[0].title).toBe(title, "El title debe ser null");
    expect(blogs[0].body).toBe(body, "El body debe ser null");
  });
  
});


