const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const routes = express.Router();

// Routes
routes.post("/login", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "SELECT * FROM users WHERE email = ? ",
      [req.body.email],
      async (err, rows) => {
        if (err) return res.send(err);
        if (rows) {
          const validPass = await bcrypt.compare(
            req.body.password,
            rows[0].password
          );
          if (validPass) {
            jwt.sign({ user: rows }, "secretKey", (error, token) => {
              res.json({
                user: rows[0].email,
                token: token,
                rol: rows[0].rol,
              });
            });
          } else {
            res.json({
              error: "Password incorrecta",
            });
          }
        } else {
          res.json({
            error: "Email o password incorrectos",
          });
        }
      }
    );
  });
});

routes.post("/register", async (req, res) => {
  let user = req.body.email;
  let rol = req.body.rol;
  let password = await bcrypt.hash(req.body.password, 10);
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "INSERT INTO users (email, password, rol) VALUES ( ?, ?, ? )",
      [user, password, rol],
      (err, rows) => {
        if (err) return res.send(err);
        res.json("Usuario creado correctamente");
      }
    );
  });
});

// -------------------------------- Sneakers ---------------------------------------------------
routes.get("/sneakers", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM sneakers", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

routes.get("/sneaker/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM sneakers WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

routes.post("/sneaker", (req, res) => {
  token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      error: "Necesario autentificacion",
    });
    return;
  }
  jwt.verify(token, "secretKey", (error, user) => {
    if (error) {
      res.json({
        error: "Token Invalido",
      });
    } else {
      req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("INSERT INTO sneakers set ?", [req.body], (err, rows) => {
          if (err) return res.send(err);
          res.json(req.body);
        });
      });
    }
  });
});

routes.delete("/sneaker/:id", (req, res) => {
  token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      error: "Necesario autentificacion",
    });
    return;
  }
  jwt.verify(token, "secretKey", (error, user) => {
    if (error) {
      res.json({
        error: "Token Invalido",
      });
    } else {
      req.getConnection((err, conn) => {
        if (err) return res.send(err);
        req.getConnection((err, conn) => {
          if (err) return res.send(err);
          conn.query(
            "DELETE FROM sneakers WHERE id = ?",
            [req.params.id],
            (err, rows) => {
              if (err) return res.send(err);
              res.send("Zapatilla eliminada correctamente");
            }
          );
        });
      });
    }
  });
});

routes.post("/sneaker/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE sneakers set ? WHERE id = ?",
      [req.body, req.params.id],
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

    conn.query(
      "SELECT * FROM brands WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
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
  token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      error: "Necesario autentificacion",
    });
    return;
  }
  jwt.verify(token, "secretKey", (error, user) => {
    if (error) {
      res.json({
        error: "Token Invalido",
      });
    } else {
      req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("INSERT INTO raffles set ?", [req.body], (err, rows) => {
          if (err) return res.send(err);
          res.json(req.body);
        });
      });
    }
  });
});

routes.get("/raffle/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM brands WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});
// ------------------------------------- Shops --------------------------------------------
routes.get("/shops", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM shops", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

routes.post("/shop", (req, res) => {
  token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      error: "Necesario autentificacion",
    });
    return;
  }
  jwt.verify(token, "secretKey", (error, user) => {
    if (error) {
      res.json({
        error: "Token Invalido",
      });
    } else {
      req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query("INSERT INTO shop set ?", [req.body], (err, rows) => {
          if (err) return res.send(err);
          res.json(req.body);
        });
      });
    }
  });
});

routes.get("/shop/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM shops WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});

function verifyToken(req, res, next) {
  const tokenHeader = req.headers["authorization"];
  if (typeof tokenHeader !== "undefined") {
    const token = tokenHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.status(403);
  }
}

module.exports = routes;
