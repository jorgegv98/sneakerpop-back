const express = require('express');
const routes = express.Router();

// Routes 

// -------------------------------- Sneakers ---------------------------------------------------
routes.get('/sneakers',(req,res)=>{
    req.getConnection((err,conn)=>{
        if (err) return res.send(err);

        conn.query('SELECT * FROM sneakers',(err,rows)=>{
        if (err) return res.send(err);
            res.json(rows);
        })
    })
});

routes.get("/sneaker/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM sneakers WHERE id = ?", [req.params.id] ,(err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

routes.post("/sneaker", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query('INSERT INTO sneakers set ?',[req.body],(err, rows) => {
      if (err) return res.send(err);
      res.json(req.body);
    });
  });
});

routes.delete("/sneaker/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("DELETE FROM sneakers WHERE id = ?", [req.params.id], (err, rows) => {
      if (err) return res.send(err);
      res.send("Zapatilla eliminada correctamente");
    });
  });
});

routes.post("/sneaker/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
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

// --------------------------------- Brands ---------------------------------------------------

routes.get("/brands", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM brands", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

routes.post("/brand", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO brands set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
      res.json(req.body);
    });
  });
});

routes.get("/brand/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM brands WHERE id = ?",[req.params.id],(err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});


//--------------------------------------- Raffles -------------------------------------------------------------------------

routes.get("/raffles", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM raffles", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

routes.post("/raffle", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO raffles set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
      res.json(req.body);
    });
  });
});

routes.get("/raffle/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM brands WHERE id = ?",[req.params.id],(err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});


module.exports = routes;