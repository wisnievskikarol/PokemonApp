export async function fetchPokemons(start, end) {
  let urllist = [];
  for (let i = start; i <= end; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const json = await response.json();
    urllist.push(json);
  }
  return urllist;
}
