const readCookie = (name, ca) => {
    const nameEQ = name + "=";
    const c = ca.split(';').find(a => a.indexOf(nameEQ) !== -1);
    return c && c.split(nameEQ)[1] || null;
};

module.exports = {
    readCookie,
};