export default async function deleteProducts(host='http://localhost:3000', data){
    const apiUrlEndpoint = '/api/deleteProducts';
    const response = await fetch(apiUrlEndpoint, {
        method: 'post',
        headers: {'Content-Type': 'text/html; charset=UTF-8'},
        body: data
    });
    const json = await response.json();
    return json;
}