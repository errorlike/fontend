import { useState } from 'react';

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

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  );
};
const Persons = ({ persons }) => {
  return (
    persons.map((person => {
      return <Person key={person.id} person={person} />;
    }))
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: "040-1234567",
      id: 1
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523',
      id: 2
    },
    {
      name: 'Dan Abramov',
      number: '12-43-234345',
      id: 3
    },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122',
      id: 4
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    if (!checkRepeatName(persons, newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
    };
    setNewName("");
    setNewNumber("");
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


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input />
      </div>
      <h2>add a New</h2>
      <PersonForm handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;