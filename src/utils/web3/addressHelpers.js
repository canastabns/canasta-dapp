export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export const isEqualAddress = (a1, a2) => {
  if(!a1 || a1 === NULL_ADDRESS)
    return false;

  if(!a2 || a2 === NULL_ADDRESS)
    return false;

  return a1.toLowerCase() === a2.toLowerCase();
};
