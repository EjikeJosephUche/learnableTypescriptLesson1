interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

// Define the function with the proper generics
export function filterPersons<
  T extends 'user' | 'admin',  // personType argument is either 'user' or 'admin'
>(persons: Person[], personType: T, criteria: Partial<T extends 'user' ? User : Admin>): T extends 'user' ? User[] : Admin[] {
    // Filter persons based on the personType
    const filteredPersons = persons.filter((person) => person.type === personType);
    
    // Further filter based on the criteria
    const result = filteredPersons.filter((person) => {
        let criteriaKeys = Object.keys(criteria) as (keyof (User | Admin))[];
        return criteriaKeys.every((fieldName) => {
            return person[fieldName] === criteria[fieldName];
        });
    });

    // Return the result, with proper type narrowing
    return result as T extends 'user' ? User[] : Admin[];
}

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);


console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);

// function for proper formatting
function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}
