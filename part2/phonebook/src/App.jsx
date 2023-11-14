import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [style, setStyle] = useState('notification')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (checkExisting()){
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setStyle('notification')
          setNotificationMessage(
            `Added ${newName}`
          )
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const updateNumber = person => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
      const changedNumber = {...person, number: newNumber}
      console.log(changedNumber)

      personService
        .update(person.id, changedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(i => i.id !== person.id ? i : returnedPerson))
        })

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  //Ugly but works i guess?

  const checkExisting = () => {
    for (let i in persons){
      if (persons[i].name === newName){
        updateNumber(persons[i])
        return false
      }
    }
    return true
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(response => {
            setPersons(persons.filter(n => n.id !== id))
          })
        .catch(error => {
          setStyle('error')
          setNotificationMessage(
            `Information of ${name} has already been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={style} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLocaleLowerCase().includes(filter)).map(person =>
          <Person 
            key={person.id}
            person={person} 
            remove={() => removePerson(person.id, person.name)}
          />
        )}
      </ul>
    </div>
  )
}

export default App