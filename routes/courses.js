const express =require("express");
const Joi =require("joi")


const router =express.Router()

const courses =[
    {id:1,name:"course:1"},
    {id:2,name:"course:2"},
    {id:3,name:"course:3"},
]


router.get('/', (req, res) => {
    res.send(courses);
})

//parameter
router.get('/:id', (req, res) => {
    const course = courses.find(x=> x.id ===parseInt(req.params.id))
    if(!course) res.status(404).send("Not found course")
    res.send(course);
})

//params
router.get('/:year/:month', (req, res) => {
    res.send(req.params);
})

//qurey parameters
router.get('/:year/:month', (req, res) => {
    res.send(req.query);
})

//POST

router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {
    const course = courses.find(x=> x.id ===parseInt(req.params.id))
    if(!course) return res.status(404).send("Not found course")
    const {error}=validateCourses(req.body)
    

    if(error) return res.status(400).send(error.details[0].message)
  
    courses.push(course);
    res.send(course);
})

//Delete
router.delete('/api/courses/:id', (req, res) => {
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

module.exports = router