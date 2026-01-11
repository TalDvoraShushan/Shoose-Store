import  query from "../db/db.js";

export async function getAllOrder(req,res)
{
    try{
    let result=await query("select * from prodfororder as po join orders as o on po.orderid=o.idorders join users as u on u.idusers=o.idusers ");
    res.json(result[0]);
    }
    catch(err){
        res.status(404).send("מצטערים אי אפשר לשלוף את כל הקטגוריות"+err.message)
    }
}

export async function getOrderById(req,res)
{
    let id=req.params.id;
    try{
    let result=await query("select * from prodfororder as po join orders as o on po.orderid=o.idorders join users as u on u.idusers=o.idusers where po.id="+id);
    if(result[0].length==0)
        return res.status(404).send("מצטערים אין הזמנה עם כזה קוד")
    
    res.json(result[0][0]);
    }
    catch(err){
        res.status(404).send("מצטערים אי אפשר לשלוף הזמנה לפי קוד"+err.message)
    }
}

export const add = async (req, res) => {
    let body = req.body;
    let date=body.orderdate.substring(0,10);

    if (!body.address)
        return res.status(404).send(" address   is required");
        let d1=new Date(body.orderdate)
        let d2=new Date(d1.getFullYear(),d1.getMonth(),d1.getDate()+1)
     try {
        let result = await query(`insert into orders (idusers ,orderdate,arrivedate,address, isOut ) values('${body.idusers}','${date}',DATE_ADD('${date}',INTERVAL 7 DAY),'${body.address}',0)`);
        let orderid=result[0].insertId;
        let str="insert into prodfororder (prodid,orderid,amount) values "
        let i=0;
        for(;i<body.products.length-1;i++)
            str+=`('${body.products[i].idproducts}','${orderid}','${body.products[i].qty}'),`
        str+=`('${body.products[i].idproducts}','${orderid}','${body.products[i].qty}');`
        result=await query(str);
        return res.json({
            idusers: body.idusers,
            idorders:result[0].insertId
        });
    }
    catch (err) {
        res.status(400).send("מצטערים אי אפשר להוסיף הזמנה  " + err.message)
    }
}

export async function getOrderNotOut(req,res)
{
    try{
    let result=await query("select * from orders where isOut=0");
    res.json(result[0]);
    }
    catch(err){
        res.status(404).send("מצטערים אי אפשר לשלוף את כל ההזמנות שלא יצאו לדרך"+err.message)
    }
}

export async function updateIsOut(req,res){
    let id=req.params.id;
    let str=`update orders set isOut=1 where idorders=`+id;

}

export async function update(req,res)
{
    let body=req.body;
    let id=req.params.id;
    
    if (!body.idusers||!body.idproduct||!body.amount||!body.orderdate||!body.arrivedate||!body.isOut)
         return res.status(404).send("  חסר נתונים לעדכון")
   
    let str=`update orders set  idusers='${body.idusers}', idproduct='${body.idproduct}', amount='${body.amount}', orderdate='${body.orderdate}', arrivedate='${body.arrivedate}', isOut='${body.isOut}' `;
    str+=" where idorders="+id;
    try{
        let result=await query(str);
        if(result[0].affectedRows==0)
            return res.status(404).send(" מצטערים אי אפשר לעדכן הזמנה זאת")
        
            let result2=await query(`select * from orders where idorders=${id}`)
        res.json(result2[0][0]);
    }
    catch(err){
        res.status(404).send("מצטערים אי אפשר לעדכן הזמנה"+err.message)
    }
}