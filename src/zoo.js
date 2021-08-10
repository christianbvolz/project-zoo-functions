const { species } = require('./data');
const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(id1, id2) {
  const result = [];
  if (!id1) {
    return result;
  }
  result.push(species.find((animal) => animal.id === id1));
  if (id2) {
    result.push(species.find((animal) => animal.id === id2));
  }
  return result;
}

function getAnimalsOlderThan(animal, age) {
  const specieId = species.find(({ name }) => animal === name);
  return specieId.residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(name) {
  if (!name) {
    return {};
  }
  return employees.find(({ firstName, lastName }) => firstName === name || lastName === name);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(specie) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
