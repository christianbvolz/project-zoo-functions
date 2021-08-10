const { species } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
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
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.some((employee) => employee === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(specie) {
  if (specie) {
    return species.find(({ name }) => name === specie).residents.length;
  }
  return species.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function calculateEntry(entrants) {
  if (!entrants || entrants === []) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, type) => acc + entrants[type] * prices[type], 0);
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
