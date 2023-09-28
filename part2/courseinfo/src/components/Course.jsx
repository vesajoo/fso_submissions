const Course = ({course}) => {
    let totalAmount = course.parts.reduce(function(sum, part){
        return sum + part.exercises
    }, 0)
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part =>
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>)}
            </ul>
            <p><b>total of {totalAmount} exercises</b></p>
        </div>
    )
}

export default Course