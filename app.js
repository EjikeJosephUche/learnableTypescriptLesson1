"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsOfAge23 = exports.usersOfAge23 = exports.persons = void 0;
exports.filterPersons = filterPersons;
exports.persons = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];
// Define the function with the proper generics
function filterPersons(persons, personType, criteria) {
    // Filter persons based on the personType
    var filteredPersons = persons.filter(function (person) { return person.type === personType; });
    // Further filter based on the criteria
    var result = filteredPersons.filter(function (person) {
        var criteriaKeys = Object.keys(criteria);
        return criteriaKeys.every(function (fieldName) {
            return person[fieldName] === criteria[fieldName];
        });
    });
    // Return the result, with proper type narrowing
    return result;
}
exports.usersOfAge23 = filterPersons(exports.persons, 'user', { age: 23 });
exports.adminsOfAge23 = filterPersons(exports.persons, 'admin', { age: 23 });
console.log('Users of age 23:');
exports.usersOfAge23.forEach(logPerson);
console.log('Admins of age 23:');
exports.adminsOfAge23.forEach(logPerson);
// function for proper formatting
function logPerson(person) {
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(person.type === 'admin' ? person.role : person.occupation));
}
