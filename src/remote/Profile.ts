import { ProfileType } from '@nearpaydev/nearpay-ts-sdk';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

const storage = new Storage();

export const PROFILE_DB_KEY = 'PROFILE_KEY';

export class ConnectionProfile {
  static async save(profile: ProfileType) {
    await storage.create();
    await storage.set(PROFILE_DB_KEY, JSON.stringify(profile));

    // localStorage.setItem(PROFILE_DB_KEY, JSON.stringify(profile));
  }

  static async get(): Promise<ProfileType | undefined> {
    await storage.create();
    const profile = await storage.get(PROFILE_DB_KEY);
    // const profile = localStorage.getItem(PROFILE_DB_KEY);
    if (!profile) return undefined;

    return JSON.parse(profile) as ProfileType;
  }

  static async getIdOrGenerate(): Promise<string> {
    await storage.create();
    const profile = await ConnectionProfile.get();
    return profile === undefined ? uuid() : profile.id;
  }

  static async forgetDevice() {
    await storage.create();
    // TODO: may add the forget device payload
    storage.remove(PROFILE_DB_KEY);
  }
}
