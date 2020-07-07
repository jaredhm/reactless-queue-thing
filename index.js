const express = require("express");
const app = express();
const { OrderQueue } = require("./orderQueue");
const { Order } = require("./order");
const port = 8080;

const q = new OrderQueue();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/static"));

app.get("/orders", (req, res) => {
    res.json(q.map(o => o.toJSON()));
});

app.get("/orders/head", (req, res) => {
    res.json(q.isEmpty
        ? {}
        : q.head.toJSON()
    );
});

app.get("/orders/:uuid", (req, res) => {
    const o = q.find(o => o.uuid === req.params.uuid);
    if(o === undefined) {
        res.status(404).json({});
    } else {
        res.json(o)
    }
})

app.post("/orders/save", (req, res) => {
    const body = req.body;
    if(!body.name || !body.phone){
        res.status(500).json({})
    } else {
        q.enqueue(new Order(body.name, body.phone));
        res.json(q.tail.toJSON());
    }
});

app.post("/orders/process", (req, res) => {
    const o = q.dequeue();
    res.json(o === null
        ? {}
        : o.toJSON()
    );
});

app.listen(port);