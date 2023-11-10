const Persons = (props) => {
    return (
      //<li>{person.name} {person.number}</li>
      <ul>
        {props.persons.filter(person => person.name.toLocaleLowerCase().includes(props.filter)).map(person =>
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    )
  }
  
  export default Persons