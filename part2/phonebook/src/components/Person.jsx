const Person = ({person, remove}) => {
    return (
        <div>
            <li>{person.name} {person.number}</li>
            <button onClick={remove}>remove</button>
        </div>
    )
  }
  
  export default Person