export default async function createProduct(host='http://localhost:3000', data){
    const apiUrlEndpoint = host + '/api/createProduct';
    const response = await fetch(apiUrlEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response;
}