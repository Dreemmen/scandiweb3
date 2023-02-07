export default async function getProducts(host='http://localhost:3000'){
    const apiUrlEndpoint = host + '/api/getProducts';
    const response = await fetch(apiUrlEndpoint);
    const json = await response.json();
    return json;
}