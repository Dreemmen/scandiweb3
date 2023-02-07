import mysql from 'mysql2/promise';

export default async function dbhandler(req, res) {
    const errors = [];
    const req_data = req.body;
    req_data.parameters = '';

    if(req.method == 'POST' && req_data){
        // helpers funtion here needed
        //first check chaks if data has propertie
        if(req_data.hasOwnProperty('sku') == false || req_data.sku == 'undefined' || req_data.sku == ''){ errors.push('Please enter SKU!\n'); }
        if(req_data.hasOwnProperty('name') == false || req_data.name == 'undefined' || req_data.name == ''){ errors.push('Please enter name!\n'); }
        if(req_data.hasOwnProperty('price') == false || req_data.price == 'undefined' || req_data.price == ''){ errors.push('Please enter price!\n'); }
        if(req_data.hasOwnProperty('category_id') == false || req_data.category_id == 'undefined' || req_data.category_id == ''){ errors.push('Please chose product type!\n'); }

        if(req_data.hasOwnProperty('category_properties')) {
            for(let key in req_data.category_properties){
                if(
                    req_data.hasOwnProperty(req_data.category_properties[key]) == false
                    || req_data[req_data.category_properties[key]] == 'undefined' 
                    || req_data[req_data.category_properties[key]] == ''
                ){
                    errors.push('Please enter ' + req_data.category_properties[key] + '!\n'); 
                }else{
                    req_data.parameters += req_data[req_data.category_properties[key]] + 'x';
                }
            }
            req_data.parameters = req_data.parameters.slice(0, -1);
        }
            if(errors.length){
                return res.status(500).json({results: {}, errors: errors});
            }
    } else {
        return res.status(500).json({msg: "Only POST request allowed."});
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
            const query = "INSERT INTO `products`(sku, name, price, parameters, parameters_value) VALUES(?,?,?,?,?);"
            const value = [req_data.sku, req_data.name, req_data.price, JSON.stringify(req_data.category_properties), req_data.parameters];
            const [data] = await dbconnection.execute(query, value);
            dbconnection.end();

            res.status(200).json({results: 'true', errors: errors});

        } catch (error) {
            res.status(500).json({errors: 'Could not compleate query.' });
        }
}