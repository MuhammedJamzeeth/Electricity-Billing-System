# Electricity-Billing-System

## Prerequisites

- Java Development Kit (JDK) installed (version 8 or higher)
- MySQL (or another supported database) set up for the project
- [Apache Maven](https://maven.apache.org/) installed

## Configure Application Properties

In your project, set up database and Flyway properties in the `application.yml` file. Below is an example configuration:

```yaml
# application.yml
spring:
  application:
    name: electricity-billing-api
  datasource:
    url: jdbc:mysql://localhost:3306/electricity-billing-system
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: none
    show-sql: true
  flyway:
    enabled: true
    validate-on-migrate: true
    baseline-on-migrate: true
    locations: classpath:db/migration


```
## Repairing Flyway Migrations

If you encounter database migration issues, such as partially applied migrations or validation failures, use Flyway's repair command to fix them.

### Steps to Repair Flyway

1. **Navigate to the Project Directory**:
    - Open a terminal or command prompt.
    - Navigate to the root directory of the project where the `pom.xml` file is located.

2. **Run Flyway Repair**:
    - Execute the following Maven command to repair Flyway:
      ```bash
      mvn flyway:repair
      ```
    - This command will clean up the Flyway schema history table and remove any failed migrations.

3. **Re-run the Application**:
    - Once the repair is complete, re-run the application to reapply any migrations.

### Additional Flyway Commands

- **Clean Database** (only for development/testing):
  ```bash
  mvn flyway:clean