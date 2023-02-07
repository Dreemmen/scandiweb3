import mysql from 'mysql2/promise';

export default async function dbhandler(req, res) {
    const configuration = {
        host: '82.163.176.111',
        database: 'heyarnol_project1',
        user: 'heyarnol_user1',
        password: 'B3SPa5uqBY2m',
        port: 3306
    }
    const dbconnection = await mysql.createConnection(configuration);
    try {
        const query = "SELECT `category_id` as `id`, GROUP_CONCAT(DISTINCT `name` SEPARATOR '/|') as `values` FROM `product_attributes` GROUP BY `category_id`";
        const value = [];
        const [rawdata] = await dbconnection.execute(query, value);
        dbconnection.end();

        var data = [];
        for(let key in rawdata){
          var arr = String.prototype.split.call(rawdata[key].values, "/|");
          data[rawdata[key].id] = arr.filter(e => e.length);
        }

        res.status(200).json({results: data});

    } catch (error) {
        //res.status(500).json({error: error.message});
    }
}