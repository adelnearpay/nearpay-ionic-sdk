/**
 * fields:
 *  1- User

 *  
 *  2- Users
 *      - list of avalible users    
 *      - could be a ws user or network user
 *      - ws user will have port and ip 
 *      - network will have paring code
 *      - user will be json
 *      - type of user will be determined from function isWsUser, etc
 *      - key: user-<connection-type>-<hyphen-separated-values> 
 * 
 *  3- last connection
 *      - key: nearpay-last-connection
 *      - value: User
 */

import {
  ConnectionInfo,
  NEARPAY_CONNECTOR,
  WsConnectionInfo,
} from '@nearpaydev/nearpay-ts-sdk';
import { usersKey } from './keys';
import { Storage } from '@ionic/storage';

const storage = new Storage();

export function ConnectionsAreEqual(
  user1: ConnectionInfo,
  user2: ConnectionInfo,
) {
  const equal = JSON.stringify(user1) === JSON.stringify(user2);
  return equal;
}

export async function dbSaveUsers(users: ConnectionInfo[]) {
  await storage.create();
  await storage.set(usersKey(), JSON.stringify(users));
}

export async function dbGetUsers(): Promise<ConnectionInfo[]> {
  await storage.create();
  const users = await storage.get(usersKey());

  return users
    ? (JSON.parse(users) as ConnectionInfo[])
    : ([] as ConnectionInfo[]);
}

export async function dbGetLastUser(): Promise<ConnectionInfo | undefined> {
  const users = await dbGetUsers();
  return users.length > 0 ? users[0] : undefined;
}

export async function dbAddUser(user: ConnectionInfo) {
  let users = (await dbGetUsers()).filter(
    oldUser => !ConnectionsAreEqual(user, oldUser),
  );

  dbSaveUsers([user, ...users]);
}

export async function dbDeleteUser(user: ConnectionInfo) {
  let users = (await dbGetUsers()).filter(
    oldUser => !ConnectionsAreEqual(user, oldUser),
  );

  dbSaveUsers(users);
}

export async function dbGetWsUsers(): Promise<WsConnectionInfo[]> {
  return (await dbGetUsers()).filter(
    user => user.type === NEARPAY_CONNECTOR.WS,
  ) as WsConnectionInfo[];
}

// export default function noThing() {}
