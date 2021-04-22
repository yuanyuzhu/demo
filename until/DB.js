/*
 * @Author: RYPY
 * @Date: 2021-03-26 14:24:20
 * @LastEditors: RYPY
 * @LastEditTime: 2021-03-26 14:28:43
 */
const mysql=require("mysql");
const config=require("./db_config");
class DB{
    //建立数据库连接
    getConn(){
        this.conn=mysql.createConnection(config);
        this.conn.connect(err=>{if(err)console.log("数据库连接失败")});
    }
    //执行sql语句
    getDataByQuery(sql,arrData){
        return new Promise(resolve=>{
           this.conn.query(sql,arrData,(err,data)=>{
               if(!err)resolve([null,data]);
               else resolve([err,null]);
           }); 
        });
    }
    //关闭数据库连接
    closeConn(){
        this.conn.end(err=>{if(err)console.log("数据库关闭失败！")});
    }
}
module.exports=new DB;