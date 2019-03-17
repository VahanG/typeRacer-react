const fs = require('fs');
const uuidv4 = require('uuid/v4');
const {promisify} = require('util');

const _FOLDER_ = "db";

class ORM {

    static _JSONToFileFormat(json) {
        return JSON.stringify(json, null, 2);
    }

    static _FileToJSON(data) {
        return JSON.parse(data);
    }

    static async find(modelName, filter = {}) {
        const content = await ORM._getFileContent(modelName);
        const keys = Object.keys(filter);
        const list = content.filter(item => keys.reduce((r, k) => r ? item[k] === filter[k] : false, true));
        return {
            total: list.length,
            list,
        };
    }

    static async findFirst(modelName, filter) {
        const content = await ORM._getFileContent(modelName);
        const keys = Object.keys(filter);
        return content.find(item => keys.reduce((r, k) => r ? item[k] === filter[k] : false, true));
    }

    static async getById(modelName, id) {
        const content = await ORM._getFileContent(modelName);
        return content.find(item => item.id === id);
    }

    static async create(modelName, data) {
        const content = await ORM._getFileContent(modelName);
        data.id = uuidv4();
        content.push(data);
        await ORM._saveContent(modelName, content);
        return data;
    }

    static async update(modelName, id, data) {
        const content = await ORM._getFileContent(modelName);
        const item = content.find(item => item.id === id);
        if (!item) {
            return null;
        }
        Object.keys(data).forEach(key => {
            item[key] = data[key];
            if (data[key] === null) {
                delete item[key];
            }
        });
        await ORM._saveContent(modelName, content);
        return item;
    }

    static async deleteById(modelName, id) {
        const content = await ORM._getFileContent(modelName);
        const index = content.findIndex(item => item.id === id);
        if (index === -1) {
            return null;
        }
        const [item] = content.splice(index, 1);
        await ORM._saveContent(modelName, content);
        return item;
    }

    static async _getFileContent(modelName) {
        const path = `${_FOLDER_}/${modelName}.json`;
        if (!(await promisify(fs.exists)(path))) {
            return [];
        }
        return promisify(fs.readFile)(path)
            .then(data => ORM._FileToJSON(data));
    }

    static async _saveContent(modelName, content) {
        return promisify(fs.writeFile)(`${_FOLDER_}/${modelName}.json`, ORM._JSONToFileFormat(content));
    }
}

module.exports = ORM;