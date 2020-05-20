const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
   
async create(attrs) {
    attrs.id = this.randomId();
    
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);
    
    const records = await this.getAll();
    
    const record = {...attrs, password: `${buf.toString('hex')}.${salt}`};
    
    records.push(record)
    
    await this.writeAll(records);
    
    return record;
    }

    async comparePassword(saved, supplied) {
        // Saved - Password saved in db - hashed.salt
        // Supplied - password given by a user, raw
        const result = saved.split('.')
        
        const hash = result[0]
        const salt = result[1]
        
        const hashedSupplied = await scrypt(supplied, salt, 64)
        
        return hash === hashedSupplied.toString('hex');
        }    
}

module.exports = new UsersRepository('users.json');

//     const test = async () => {
//     const repo = new UsersRepository('users.json');
//     await repo.create({email: 'd.matthew1989@yahoo.com', password: 'password123'})
//     // const users = await repo.getAll();
//     // const user = await repo.getOne('0d87621b')
// //    await repo.delete('80c6aadd')
// // await repo.update('asddsdfdfsffddffdsffdsdfs4', {password: 'pdsafddfdsfds'});

//     const oneRec = await repo.getOneBy({ email: 'd.matthew1989@yahoo.com'})
//         console.log(oneRec)
// };

//     test();