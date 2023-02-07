//fetch data from json data file. server side funtion, works wits CROS
export default async function getServersSideProps(url){
    const data = await import(url);
    return data;
}