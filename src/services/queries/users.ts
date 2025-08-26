import { userKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';

export const getUserByUsername = async (username: string) => { };

export const getUserById = async (id: string) => {
  const user = await client.hGetAll(userKey(id));
  return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
  const id = genId();
  await client.hSet(userKey(id), serialize(attrs));

  return id;
};

export const serialize = (user: CreateUserAttrs) => {
  return {
    username: user.username,
    password: user.password
  };
};

export const deserialize = (id: string, user: Record<string, string>) => {
  return {
    id,
    username: user.username,
    password: user.password
  };
};
