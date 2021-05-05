const express = require('express');
const routes = express.Router();

// Routes 

routes.get('/sneakers',(req,res)=>{
    req.getConnection((err,conn)=>{
        if (err) return res.send(err);

        conn.query('SELECT * FROM sneakers',(err,rows)=>{
        if (err) return res.send(err);
            res.json(rows);
        })
    })
});

routes.post("/sneaker", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    console.log(req.body);
    conn.query('INSERT INTO sneakers set ?',[req.body],(err, rows) => {
      if (err) return res.send(err);
      res.json(req.body);
    });
  });
});

routes.delete("/sneaker/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    console.log(req.body);
    conn.query("DELETE FROM sneakers WHERE id = ?", [req.params.id], (err, rows) => {
      if (err) return res.send(err);
      res.send("Zapatilla eliminada correctamente");
    });
  });
});

routes.post("/sneaker/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    console.log(req.body);
    conn.query(
      "UPDATE sneakers set ? WHERE id = ?",
      [req.body,req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.send("Zapatilla actualizada correctamente");
      }
    );
  });
});




module.exports = routes;