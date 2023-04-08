# Secrets exposed

This vulnerability is basically a bad-configuration of the project. When we talk about "secrets exposed" it means that our application is keeping secret information on its version control repositories like GitHub. That means: our application is exposing on the internet sensitive information that should be keept only on our environment variables.

## Basics

For resolving this problem, we can check the connection files on this directory.
Each of them has is a database configuration file, one insecure that keeps "hard-coded" sensitive informations like the database host, user and password, and the other that accesses these informations from the `process.env` variable. 

> Note: For the second strategy to work, you should add a `.gitignore` file at the root of the project containing the following line: 

```.gitignore
.env
```

## Testing

Copy the `example.env` file to a file named `.env`:

```bash
## On linux bash run:
cp example.env .env
```

then, change the `.env` file to contain the access information of the mysql server on your machine.

```.env
DB_HOST=localhost
DB_DATABASE=db_name
DB_PASSWORD=password
DB_USER=username
DB_PORT=3306
```
