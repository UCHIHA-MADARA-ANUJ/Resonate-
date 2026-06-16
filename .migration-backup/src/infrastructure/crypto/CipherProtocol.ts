// 100% Military-Grade End-to-End Encryption Infrastructure
// Real architects don't trust databases with teen mental health records.
// We encrypt everything on the client before it ever touches a network request.

export class CipherProtocol {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly SALT_LENGTH = 16;
  private static readonly IV_LENGTH = 12;
  private static readonly ITERATIONS = 100000;

  static async generateKeyMaterial(password: string): Promise<{ key: CryptoKey; salt: Uint8Array }> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const salt = window.crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));

    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: this.ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: this.ALGORITHM, length: this.KEY_LENGTH },
      false,
      ['encrypt', 'decrypt']
    );

    return { key, salt };
  }

  static async encryptPayload(plaintext: string, key: CryptoKey): Promise<{ cipher: ArrayBuffer; iv: Uint8Array }> {
    const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    const enc = new TextEncoder();
    
    const cipher = await window.crypto.subtle.encrypt(
      { name: this.ALGORITHM, iv },
      key,
      enc.encode(plaintext)
    );

    return { cipher, iv };
  }

  static async decryptPayload(cipher: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<string> {
    const decrypted = await window.crypto.subtle.decrypt(
      { name: this.ALGORITHM, iv: iv as BufferSource },
      key,
      cipher
    );
    
    const dec = new TextDecoder();
    return dec.decode(decrypted);
  }
}
