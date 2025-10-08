//* her bir mesaja tekrarlanmayan random idler teyin etmek ucun
export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
