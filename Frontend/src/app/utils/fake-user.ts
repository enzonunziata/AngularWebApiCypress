import { Base64 } from 'js-base64';
import { User } from '../models/user.model';

/**
 * Utility class for tests.
 */
export class FakeUser {
  private _data: User;

  /**
   *
   * @param expired If 'true', generates an expired user. Default is 'false'.
   */
  constructor(expired: boolean = false) {
    this._data = {
      username: 'test@example.com',
      fullname: 'This is the full name',
      roles: ['R1', 'R2', 'R3'],
      exp: Math.floor(new Date().getTime() / 1000),
    } as User;

    if (expired) this._data.exp -= 1000;
    else this._data.exp += 1000;
  }

  /**
   *
   * @returns The fake user.
   */
  public data(): User {
    return this._data;
  }

  /**
   * On client-side we only use the second dot-split part.
   * @returns A fake jwt token.
   */
  public token(): string {
    const fakeInfoEncoded = Base64.btoa(JSON.stringify(this._data));
    return `whatever.${fakeInfoEncoded}.another-one`;
  }
}
