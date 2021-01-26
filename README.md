# nmbin
Place for your code.

# Requirements
1. MongoDB database.
2. Node v11+.

# Installation
1. Create file called `config.json` in project's root directory.
```json
{
    "port": "2452",
    "mongo": { 
        "ip": "127.0.0.1:27017", 
        "database": "nmbin", 
        "username": "Nimplex", 
        "password": "password",
        "authDatabase": "admin"
    }
}
```
2. Install all dependencies.
`npm install --save`
3. Build code.
`npm run build`
4. Run server.
`node dist/server.js`
