# Broken access authentication

This kind of vulnerability occurs when a web application doesn't implement the right level of control over authentication and access, when it doesn't care of what kind of user can access what kind of resource. 

We could take as an example the lack of "role" confirmation on each resources. When we define that the kind of user "admin" has control over the application, then the other kinds should not have this access. To keep the "confidentiality", each user of kind "user" should have access only to it's own resources, and so on and so forth.

## The basics

When we wanna implement a well designed application architecture, each user should have its role. Besides that, each resource may only be accessed when the user matches the "Role Based Access Control" (RBAC) definition, it means that you will only access what you are suposed to access.

You can find it interesting to implement an access-control-list (ACL) that provides a "code first" service-level agreement (SLA) and may not be overriden nor surpassed by the customer neither by the provider.

Some frameworks for implementing that are:

- [acl.js](https://www.npmjs.com/package/acl)
- [Spring-security](https://docs.spring.io/spring-security/reference/index.html)
- [Phalcon/Acl (php)](https://docs.phalcon.io/5.0/en/acl)

## Glossary

 - Resource - on this context, the resource word is related to the REST definition of Resource, that is **the state of the object being accessed**: `/users/123` - user 123 would be the resource. [Read this article to know more](https://restful-api-design.readthedocs.io/en/latest/resources.html).
 - SLA - A Service Level Agreement (SLA) is a contract between a service provider and its customers that documents what services the provider will furnish and defines the service standards the provider is obligated to meet.1 SLAs vary between vendors, services, and industries, but they are usually between companies and external suppliers as well as two departments within a company.
