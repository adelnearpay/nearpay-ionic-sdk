import {
  ConnectionInfo,
  NearPay,
  ProfileType,
} from '@nearpaydev/nearpay-ts-sdk';
import { ConnectionProfile } from './Profile';
import { dbAddUser, dbGetLastUser } from '../db/db';

export class RemoteNearpay extends NearPay {
  async getProfile(): Promise<ProfileType | undefined> {
    return ConnectionProfile.get();
  }
  async saveProfile(profile: ProfileType): Promise<void> {
    ConnectionProfile.save(profile);
  }
  async getLastConnection(): Promise<ConnectionInfo | undefined> {
    return dbGetLastUser();
  }
  async saveConnection(connection: ConnectionInfo): Promise<void> {
    dbAddUser(connection);
  }
}
