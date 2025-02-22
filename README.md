# learnableTypescriptLesson1

here is a link to the code sample: https://docs.google.com/document/d/1wI-IJcXLkwh6IL6zpLGk9OvQR2ueqapGasyv5jVaTJE/edit?tab=t.0

## Task Overview
The TypeScript code defines a system where we can filter a list of Person objects (which can be either a User or an Admin) based on specific criteria like type: 'user' or 'admin'. The filtering functionality is achieved through the filterPersons function, which accepts a list of persons, a type ('user' or 'admin'), and filtering criteria. The task was to fix and improve the typings for this function.

## Features
- **Filter by Type:** The persons can either be filtered by their type, either 'user' or 'admin'.
- **Criteria-based Filtering:** The filterPersons function allows filtering based on specific criteria, such as age, occupation, or role.
- **Proper Type Narrowing:** The function uses TypeScript generics and conditional types to ensure that:
- It returns an array of User objects when the personType is 'user'.
- It returns an array of Admin objects when the personType is 'admin'.
- **Partial Types:** The criteria can accept partial User or Admin objects, allowing flexibility when filtering.
- **Excluding type Property:** The criteria object excludes the type field to ensure filtering by relevant properties only.

## Problem and Solution
### Problem
The original code needed fixes to ensure proper type narrowing based on the personType. Specifically, it needed to:

1. Return the correct array type (User[] or Admin[]) based on the personType argument.
2. Accept a partial User or Admin object as the filtering criteria, excluding the type field.

### Solution
The filterPersons function was refactored to use TypeScript generics and conditional types, for example:

```
export function filterPersons<
  T extends 'user' | 'admin',  
  P extends T extends 'user' ? Partial<User> : Partial<Admin>  
>(persons: Person[], personType: T, criteria: P): T extends 'user' ? User[] : Admin[] {
    const filteredPersons = persons.filter((person) => person.type === personType);
    
    const result = filteredPersons.filter((person) => {
        let criteriaKeys = Object.keys(criteria) as (keyof (User | Admin))[];
        return criteriaKeys.every((fieldName) => {
            return person[fieldName] === criteria[fieldName];
        });
    });

    return result as T extends 'user' ? User[] : Admin[];
}

```
## Key Improvements:
- *Generic Function:* The function is now generic, accepting T for the personType and P for the filtering criteria. This ensures that the correct type is returned.
- *Partial Types:* The criteria can now be a partial User or Admin object, depending on the personType.
- *Type Exclusion:* The type field is excluded from the criteria, ensuring that it cannot be used for filtering.

## Usage
The code defines two types of persons: User and Admin, each with different properties:

- User: Has a name, age, and occupation.
- Admin: Has a name, age, and role.
You can use the filterPersons function to filter persons based on specific criteria. For example, this is how you can filter users and admins of age 23:

```
export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });


console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
```
**Example Output**
The output for users and admins aged 23 will look something similar to this:

```
Users of age 23:
 - Kate Müller, 23, Astronaut
 - Wilson, 23, Ball

Admins of age 23:
 - Agent Smith, 23, Anti-virus engineer
```

From the code, you should have noticed that the **User** and **Admin** Types are interfaces that describe the shape of user and admin objects and the **Person** is a union type (User | Admin), which can be used to represent any person.

The **filterPersons()** function takes three parameters: which are **persons (the list of people)**, **personType ('user' or 'admin')**, and **criteria (the filtering criteria)**.

It first filters the list based on the personType and then further filters the list based on the criteria object.

The **logPerson()** function is used to log the filtered persons in a user-friendly format, including their name, age, and either their occupation (for users) or their role (for admins).
