import  query from "../db/db.js";

export async function getAllcategory(req,res)
{
    try{
    let result=await query("select * from category");
    res.json(result[0]);
    }
    catch(err){
        res.status(404).send("מצטערים אי אפשר לשלוף את כל הקטגוריות"+err.message)
    }
}
