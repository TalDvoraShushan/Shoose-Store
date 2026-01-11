import query from "../db/db.js";

export async function getAllProduct(req, res) {
    try {
        let search = req.query.search;
        let perpage = req.query.perpage || 10;
        let page = req.query.page || 1;

        let q = " select * from products where isActive=1";
        if (search)
            q += " and pname like '%" + search + "%' or discrep like '%" + search + "%'";
        let toprice = req.query.toprice;
        if (toprice) {
            if (search)
                q += " and price <" + toprice;
            else
                q += " where price <" + toprice;
        }
        q += " limit " + perpage + " offset " + (page - 1) * perpage;
        let result = await query(q);
        res.json(result[0]);
    }
    catch (err) {
        return res.status(400).send("תקלה בשליפת הקורסים" + err.message)
    }
}

export async function getProductById(req, res) {
    let id = req.params.id;
    try {
        let result = await query("select * from products where idproducts=" + id);
        if (result[0].length == 0)
            return res.status(404).send("מצטערים אין מוצר עם כזה קוד")

        res.json(result[0][0]);
    }
    catch (err) {
        res.status(404).send("מצטערים אי אפשר לשלוף מוצר לפי קוד" + err.message)
    }
}

export async function getProductByIdcategory(req, res) {

    try {
        let categorId = req.params.id;
        let result = await query("SELECT * FROM products as p join category as c on p.categoryid=c.idcategory  where categoryid=" + categorId);

        res.json(result[0]);
    }
    catch (err) {
        res.status(400).send(" מצטערים אי אפשר להשלוף מוצר לפי קוד קטגוריה " + err.message)
    }
}

export async function deleteById(req, res) {
    let { id } = req.params;
    let result = await query("update products set isActive=false where idproducts=" + id);
    if (result[0].affectedRows == 0)
        return res.status(404).send("מצטערים אין מוצר עם כזה קוד")

    res.send("נמחק בהצלחה");
}

export const add = async (req, res) => {
    let body = req.body;
    if (!body.pname || !body.price || !body.color || !body.size || !body.discrep || !body.categoryid || !body.createdate||!body.imgUrl)
        return res.status(404).send("pname price color size discrep  categorid createdate imgUrl are required");
    try {
        let result = await query(`insert into products (pname,price,color,size,discrep,categoryid, createdate,imgUrl) values("${body.pname}",'${body.price}','${body.color}','${body.size}','${body.discrep}','${body.categoryid}','${body.createdate.substring(0,10)}','${body.imgUrl}')`);
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר להוסיף כזה מוצר")
        return res.json({
            pname: body.pname,
            price: body.price,
            color: body.color,
            size: body.size,
            discrep: body.discrep,
            categoryid: body.categoryid,
            createdate: body.createdate,
            imgUrl:body.imgUrl,
            id: result[0].insertId
        });
    }
    catch (err) {
        res.status(400).send("מצטערים אי אפשר להוסיף מוצר  " + err.message)
    }
    
}

export async function update(req, res) {
    let id = req.params.id;
    let body = req.body;

    if (!body.price||!body.pname||!body.discrep||!body.color||!body.size||!body.createdate||!body.categoryid)
         return res.status(404).send("  חסר מחיר  מוצר  תיאור צבע או גודל")
    let str = `update products set price='${body.price}',pname='${body.pname}',discrep='${body.discrep}',color='${body.color}',size='${body.size}',createdate='2025-11-12',categoryid='${body.categoryid}' `;
    str += "where idproducts=" + id;
    try {
        let result = await query(str);
        if (result[0].affectedRows == 0)
            return res.status(404).send(" אין מוצר עם קוד כזה")

        let result2 = await query(`select * from products where idproducts=${id}`)
        res.json(result2[0][0]);
    }
    catch (err) {
        res.status(404).send("מצטערים אי אפשר לעדכן מוצר" + err.message)
    }
}

export const totalPages = async (req, res) => {
    try {
        let search = req.query.search;
        let perpage = req.query.perpage || 10;
        let q = "select count(*) from products";
        if (search)
            q += " where name like '%" + search + "%' or descreption like '%" + search + "%'";
        let toprice = req.body.toprice;
        if(toprice)
        {
        if (search)

            q += " and price<" + toprice;
        else
            q += " where price<" + toprice;
        }
        let result = await query(q);
        return res.json({ totalPages: Math.ceil(result[0][0]["count(*)"] / perpage) })
    }
    catch (err) {
        return res.status(400).send("תקלה בשליפת הקורסים" + err.message)
    }
}