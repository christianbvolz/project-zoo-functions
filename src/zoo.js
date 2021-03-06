const { species } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
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

const animalsIncludeNames = (animals, options) => animals.map((animal) => {
  if (options.sex) {
    let residentsBySex = animal.residents.filter(({ sex }) => sex === options.sex);
    const residentsBySexSorted = { [animal.name]: residentsBySex.map(({ name }) => name).sort() };
    residentsBySex = { [animal.name]: residentsBySex.map(({ name }) => name) };
    return (options.sorted === true) ? residentsBySexSorted : residentsBySex;
  }
  const allResidents = { [animal.name]: animal.residents.map(({ name }) => name) };
  const allResidentsSorted = { [animal.name]: animal.residents.map(({ name }) => name).sort() };
  return (options.sorted === true) ? allResidentsSorted : allResidents;
});

function getAnimalMap(options) {
  const obj = { NE: [], NW: [], SE: [], SW: [] };
  Object.keys(obj).forEach((key) => {
    const animals = species.filter(({ location }) => key === location);
    obj[key] = animals.map(({ name }) => name);
    if (options && options.includeNames) {
      obj[key] = animalsIncludeNames(animals, options);
    }
  });
  return obj;
}

const verifyHour = (day) => {
  const opn = (hours[day].open > 12) ? `${hours[day].open - 12}pm` : `${hours[day].open}am`;
  const cls = (hours[day].close > 12) ? `${hours[day].close - 12}pm` : `${hours[day].close}am`;
  return (day === 'Monday') ? 'CLOSED' : `Open from ${opn} until ${cls}`;
};

function getSchedule(dayName) {
  const obj = {};
  if (!dayName) {
    Object.keys(hours).forEach((key) => {
      obj[key] = verifyHour(key);
    });
    return obj;
  }
  obj[dayName] = verifyHour(dayName);
  return obj;
}

function getOldestFromFirstSpecies(id) {
  const employee = employees.find(({ id: employeeId }) => employeeId === id);
  const specie = species.find(({ id: specieId }) => specieId === employee.responsibleFor[0]);
  const oldestAnimal = specie.residents.reduce((acc, ani) => ((acc.age < ani.age) ? ani : acc));
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    const newPrice = Math.round((prices[key] + (prices[key] * (percentage / 100))) * 100);
    prices[key] = parseFloat((newPrice / 100).toFixed(2));
  });
}

const setEmployee = ({ firstName, lastName, responsibleFor }) => {
  const speciesArray = responsibleFor.map((specieId) => {
    const specie = species.find(({ id }) => specieId === id);
    return specie.name;
  });
  return { [`${firstName} ${lastName}`]: speciesArray };
};

const findEmployee = ({ firstName: fn, lastName: ln, id }, idOrName) => {
  if (id === idOrName || fn === idOrName || ln === idOrName) {
    return true;
  }
};

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    return employees.reduce((acc, employee) => Object.assign(acc, setEmployee(employee)), {});
  }
  const employee = employees.find((element) => findEmployee(element, idOrName));
  return setEmployee(employee);
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
