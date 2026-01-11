import  query from "../db/db.js";
import bcryptjs from "bcryptjs";
import {validateMail,validatePasswod} from "./validate.js"
import { generateToken } from "../utils/help.js";

export async function getAllUsers(req,res)
{
    try{
    let result=await query("select * from users");
    let {pass,...resu}=result[0][0];
    return res.json(resu);
    }
    catch(err){
        res.status(404).send("מצטערים אי אפשר לשלוף את כל המשתמשים"+err.message)
    }
}

export async function getUserById(req,res)
{
    let id=req.params.id;
    try{
    let result=await query("select * from users where idusers="+id);
    if(result[0].length==0)
        return res.status(404).send("מצטערים אין משתמש עם כזה קוד")
    
    res.json(result[0][0]);
    }
    catch(err){
        res.status(404).send("מצטערים אי אפשר לשלוף משתמש לפי קוד"+err.message)
    }
}

export async function login(req,res)
{
    let { body } = req;
    if (!body.name || !body.pass)
        return res.status(404).send("חסר שם משתמש או סיסמא")
    try {

        let result = await query(`select * from users where name= '${body.name}'  `);
        if (result[0].length == 0)
            return res.status(404).send("לא נמצא משתמש עם פרטים כאלו")
        let isValidPass=await bcryptjs.compare(body.pass,result[0][0].pass)
        if(!isValidPass)
            return res.status(404).send("סיסמא שגויה");
        let {pass,...resu}=result[0][0]
       resu.token=generateToken(resu)
        return res.json(resu);
    }
    catch (err) {
        res.status(400).send("מצטערים משתמש לא קיים נא לבצע הרשמה " + err.message)
    }
}

export const  addUser=async(req,res)=>
{
    let body = req.body;
    if (!body.mail || !body.pass || !body.phone || !body.name )
        return res.status(404).send("mail password phone   name  are required");
    if(!validateMail(body.mail))
         return res.status(404).send("mail not valid ");
    if(!validatePasswod)
        return res.status(404).send("password not valid ");
    
    try {
        let already = await query("select * from users where name like '" + req.body.name+"'")
        if (already[0].length > 0)
            return res.status(409).send("כבר קיים משתמש עם שם כזה")

        let hiddenPass=await bcryptjs.hash(body.pass,10);
        let result = await query(`insert into users (mail ,pass , phone , name) values("${body.mail}",'${hiddenPass}','${body.phone}','${body.name}')`);
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר להוסיף כזה משתמש")
        let u={
            name:body.name,
            mail: body.mail,
            phone: body.phone,
            idusers: result[0].insertId,
            role:"user"
        }
            u.token = generateToken(u)
            return res.json(u);
    }
    catch (err) {
        res.status(400).send("מצטערים אי אפשר לשלוף משתמש  " + err.message)
    }
}


export async function update(req,res)
{
    let body=req.body;
    let id=req.params.id;
   
    if(!body.mail||!body.phone)
        return res.status(404).send("טלפון ומייל חובה")
    if(!validateMail(body.mail))
        return res.status(404).send("מייל לא תקין")
    if(!validateMail(body.phone))
        return res.status(404).send("טלפון לא תקין")
    let str=`update users set mail='${body.mail}',phone='${body.phone}' `;
   
    str+=" where idusers="+ id;
try{
    let result=await query(str);
    if(result[0].affectedRows==0)
        return res.status(404).send("מצטערים אי אפשר לעדכן משתמש זה")
    
        let result2=await query(`select * from users where idusers=${id}`)
    res.json(result2[0][0]);
}
catch(err){
    res.status(404).send("מצטערים אי אפשר לעדכן משתמש"+err.message)
}
}