import { sessionKey } from '$services/keys';
import { client } from '$services/redis';
import type { Session } from '$services/types';

export const getSession = async (id: string) => {
  const session = await client.hGetAll(sessionKey(id));

  if (Object.keys(session).length === 0) {
    return null;
  }

  return deserialize(id, session);
};

export const saveSession = async (session: Session) => {
  await client.hSet(sessionKey(session.id), serialize(session));
};

export const deserialize = (id: string, session: Record<string, string>) => {
  return {
    id,
    username: session.username,
    userId: session.userId,
  };
};

export const serialize = (session: Session) => {
  return {
    username: session.username,
    userId: session.userId,
  };
};