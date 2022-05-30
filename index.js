const express = require("express");
const Joi =require("joi")
const logger =require("./logger")

const app = express();
app.use(express.json())

const courses =[
    {id:1,name:"course:1"},
    {id:2,name:"course:2"},
    {id:3,name:"course:3"},
]

app.get('/', (req, res) => {
    res.send('Hello Word');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

//parameter
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(x=> x.id ===parseInt(req.params.id))
    if(!course) res.status(404).send("Not found course")
    res.send(course);
})

//params
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
})

//qurey parameters
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
})

//POST

app.post('/api/courses', (req, res) => {

    const {error}=validateCourses(req.body)
    

    if(error) return res.status(400).send(error.details[0].message)
    

    const course={
        id:courses.length + 1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})


//PUT

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(x=> x.id ===parseInt(req.params.id))
    if(!course) return res.status(404).send("Not found course")
    const {error}=validateCourses(req.body)
    

    if(error) return res.status(400).send(error.details[0].message)
  
    courses.push(course);
    res.send(course);
})

//Delete
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(x=> x.id ===parseInt(req.params.id))
    if(!course) return res.status(404).send("Not found course")
    const {error}=validateCourses(req.body)
    

    if(error) return res.status(400).send(error.details[0].message)
    
    const index = courses.indexOf(course)
    courses.splice(index,1);
    res.send(course);
})

function validateCourses(body) {
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(body,schema);
}



const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`listening on $${port}`))