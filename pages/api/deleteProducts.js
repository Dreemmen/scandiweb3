import mysql from 'mysql2/promise';

export default async function dbhandler(req, res) {
    const dataIn = JSON.parse(req.body).filter((elm ) => elm);
    var placeholder = '?';
    for(let i = 1; i < dataIn.length; i++){
        placeholder += ',?';
    }
    const configuration = {
        host: '82.163.176.111',
        database: 'heyarnol_project1',
        user: 'heyarnol_user1',
        password: 'B3SPa5uqBY2m',
        port: 3306
    }
    const dbconnection = await mysql.createConnection(configuration);
    try {
        const query = "DELETE FROM `products` WHERE `id` IN (" + placeholder + ")";
        //document.write(query);
        const value = dataIn;
        const [data] = await dbconnection.execute(query, value);
        dbconnection.end();

        res.status(200).json({results: data});

    } catch (error) {
        //res.status(500).json({error: error.message});
    }
}