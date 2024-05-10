// export async function geoEndereco(address) {
//     const apiKey = import.meta.env.VITE_API_KEY; 
//     const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`);
//     const data = await response.json();
//     const { lat, lng } = data.results[0].geometry;
//     return { lat, lng };
// }

export async function buscarCep(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    return data;
}

export async function buscarCordenadas(endereco) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(endereco)}&polygon_geojson=1&format=jsonv2`)
  const data = await response.json();
  const local = data[0]

  if(local) {
    return { lat: Number(local.lat), lng: Number(local.lon)}
  }

  return null
}