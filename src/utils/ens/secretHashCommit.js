export function randomSecretHash() {
  const random = new Uint8Array(32);
  crypto.getRandomValues(random);
  return '0x' + Array.from(random).map(b => b.toString(16).padStart(2, '0')).join('');
}
