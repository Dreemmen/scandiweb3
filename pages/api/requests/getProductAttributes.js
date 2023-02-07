export default async function getProductAttributes(host='http://localhost:3000', category){
    const apiUrlEndpoint = host + '/api/getProductAttributes';
    const response = await fetch(apiUrlEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'text/html; charset=UTF-8'},
        body: category
    });
    const json = await response.json();
    return json;
}