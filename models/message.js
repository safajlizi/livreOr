let connection = require('../config/db')
let moment =require('../config/moment')


class Message{
     constructor(row)
     {
         this.row=row
     }
     get id()
     {
         return this.row.id;
     }
     get content()
     {
         return this.row.content
     }
     get created_at()
     {
         return moment(this.row.created_at)
     }
    static create(content,cb)
    {
         connection.query('INSERT INTO messages SET content = ?, created_at = ?',[content,new Date()], (err,result)=>{
             if(err) throw err
             cb(result)

         })
    }
    static all(cd)
    {
        connection.query('SELECT * FROM messages', function (error, results) {
            if (error) throw error;
             cd(results.map((row)=> new Message(row)));
        });
    }
    static find(id,cd){
        connection.query('SELECT * FROM messages  where id= ? LIMIT 1',[id], function (error, results) {
            if (error) throw error;
             cd(new Message(results[0]));
        });
    }
}
module.exports=Message