export default async function getCategories(host='http://localhost:3000'){
    const apiUrlEndpoint = host + '/api/getCategories';
    const response = await fetch(apiUrlEndpoint);
    const json = await response.json();
    return json;
}