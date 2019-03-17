const ORM = require('./ORM');

class CRUDMaker {
    constructor(app) {
        this._app = app;
    };

    async find(modelName, req, res) {
        const filter = req.query;
        const {total, list} = await ORM.find(modelName, filter);
        res.json({total, list});
    }

    async findOne(modelName, req, res) {
        const {id} = req.params;
        const item = await ORM.getById(modelName, id);
        res.json(item);
    }

    async create(modelName, req, res) {
        const data = req.body;
        const item = await ORM.create(modelName, data);
        res.json(item);
    }

    async update(modelName, req, res) {
        const {id} = req.params;
        const data = req.body;
        const item = await ORM.update(modelName, id, data);
        res.json(item);
    }

    async delete(modelName, req, res) {
        const {id} = req.params;
        const item = await ORM.deleteById(modelName, id);
        res.json(item);
    }


    addEndpoint(path) {
        const setHandler = handler => async (req, res, next) => {
            try {
                handler(modelName, req, res);
            } catch (err) {
                next(err);
            }
        };

        const modelName = path.split("/").pop();

        this._app.get(`/${path}/`, setHandler(this.find));
        this._app.get(`/${path}/:id`, setHandler(this.findOne));
        this._app.post(`/${path}/`, setHandler(this.create));
        this._app.put(`/${path}/:id`, setHandler(this.update));
        this._app.delete(`/${path}/:id`, setHandler(this.delete));

        // return (subPath)=>this.addEndpoint(`${path}/:id/${subPath}`)
    };


}

module.exports = (app) => {
    return new CRUDMaker(app);
};