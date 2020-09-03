
import React from'react'
import ReactDOM from'react-dom'
import axios from 'axios'
import EventsList from'./EventsList'
import EventForm from'./EventForm'
import FormErrors from'./FormErrors'

class Eventlite extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      events: this.props.events,
      title: {value: '', valid: false},
      start_datetime: {value: '', valid: false},
      location: {value: '', valid: false},
      formErrors: {},
      formValid: false
 }
}

  handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    this.setState(newState, () => this.validateField(name, value))
}

  handleSubmit = e => {
    e.preventDefault()
    let newEvent = { title: this.state.title.value, start_datetime: this.state.start_datetime.value,location:this.state.location.value}
    axios({
      method: 'POST',
      url: '/events',
      data: { event: newEvent },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      this.addNewEvent(response.data)
      this.resetFormErrors();
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({formErrors: error.response.data})
}) }

validateForm(){
let formErrors = {}
let formValid = true
if(this.state.title.value.length <= 2) {
  formErrors.title = ["is too short (minimum is 3 characters)"]
  formValid = false
}
if(this.state.location.value.length === 0) {
formErrors.location = ["can't be blank"]
formValid = false
}

if(this.state.start_datetime.value.length === 0) {
formErrors.start_datetime = ["can't be blank"]
formValid = false
}

else if(Date.parse(this.state.start_datetime.value) <= Date.now()) {
formErrors.start_datetime = ["can't be in the past"]
formValid = false
}
this.setState({formValid: this.state.title.valid && this.state.location.valid && this.state.start_datetime.valid})
 }

resetFormErrors () {
    this.setState({formErrors: {}})
  }



validateField(fieldName, fieldValue) {
  let fieldValid = true
  let errors = []
  switch(fieldName) {
    case 'title':
    if(fieldValue.length <= 2) {
      errors = errors.concat(["is too short (minimum is 3 characters)"])
     fieldValid = false
   }
     break;

     case 'location':
      if(fieldValue.length === 0) {
        errors = errors.concat(["can't be blank"])
        fieldValid = false
      }
     break;

     case 'start_datetime':
      if(fieldValue.length === 0) {
         errors = errors.concat(["can't be blank"])
      fieldValid = false
    }
      else if(Date.parse(fieldValue) <= Date.now()) {
      errors = errors.concat(["can't be in the past"])
      fieldValid = false
   }
     break;

   }

   const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
   newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
   this.setState(newState, this.validateForm)
}

  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function(a, b){
return new Date(a.start_datetime) - new Date(b.start_datetime) })
    this.setState({events: events})
  }

render() {
  return (
      <div>
      <FormErrors formErrors = {this.state.formErrors} />
        <EventForm handleSubmit = {this.handleSubmit}
          handleInput = {this.handleInput}
          formValid={this.state.formValid}
          title = {this.state.title.value}
          start_datetime = {this.state.start_datetime.value}
          location = {this.state.location.value} />
        <EventsList events={this.state.events} />
      </div>
  )
 }
}

document.addEventListener('DOMContentLoaded',() =>{
  const node = document.getElementById('events_data')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <Eventlite events={data} />,
    document.body.appendChild(document.createElement('div')),
)
})
