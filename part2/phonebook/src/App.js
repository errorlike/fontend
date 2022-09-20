import { useState, useEffect } from 'react';
import personService from './server/persons';
const PersonForm = ({ handleChangeName, handleChangeNumber, addPerson }) => {
  return (
    <form>
      <div>
        name: <input onChange={handleChangeName} />
      </div>
      <div>
        number: <input onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>);

};

const Person = ({ person, deletePerson }) => {
  return (
    <p>{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
  );
};
const Persons = ({ persons, changePersonsState }) => {
  return (
    persons.map((person => {
      return <Person key={person.id} person={person} deletePerson={() => {
        if (window.confirm(`Delete ${person.name} ?`)) {
          personService.deleteById(person.id);
          changePersonsState(persons.filter(p => p.id !== person.id));
        }
      }} />;
    }))
  );
};
const Filter = ({ handleChangeSearchStr }) => (<div>filter shown with <input onChange={handleChangeSearchStr} /></div>);
const App = () => {
  useEffect(() => {
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons);
      });
  }, []);
  const [persons, setPersons] = useState([
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStrf] = useState('');
  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleChangeSearchStr = (event) => {
    setSearchStrf(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    if (!checkRepeatName(persons, newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personService
        .create(personObject)
        .then(responsedPerson => {
          setPersons(persons.concat(responsedPerson));
          setNewName("");
          setNewNumber("");
        });
    };
  };
  const checkRepeatName = (persons, name) => {
    const nameArray = persons.map((person) => person.name);
    if (nameArray.find(nameFromArray => nameFromArray === name) !== undefined) {
      console.log(name, "name");
      alert(`${name} is already added to phonebook`);
      return true;
    }
    return false;
  };
  const includesCaseInsensitive = (str, searchString) =>
    new RegExp(searchString, 'i').test(str);
  const changePersonsState = (persons) => {
    setPersons(persons);
  };
  const personsToShow = searchStr === '' ? persons : persons.filter((person) => includesCaseInsensitive(person.name, searchStr));
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChangeSearchStr={handleChangeSearchStr} />
      <h2>add a New</h2>
      <PersonForm handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} changePersonsState={changePersonsState} />
    </div>
  );
};

export default App;