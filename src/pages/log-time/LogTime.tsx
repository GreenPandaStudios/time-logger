import React from 'react'

import {Form, Button} from "react-bootstrap"
import { IActivity,IPerson, IPlace } from '../../types'
import { ActivitySelect } from './ActivitySelect'
import { PlaceSelect } from './PlaceSelect'
import { PersonSelect } from './PersonSelect'

export const LogTime = ()=> {
  return (
    <Form>
      <span>
        I am {" "}
        <ActivitySelect activities={getActivities()} createNewActivity= {createNewActivity}/>
        {" "} at {" "}
        <PlaceSelect places={getPlaces()} createNewPlace= {createNewPlace}/>
        <PersonSelect people={getPeople()} createNewPerson= {createNewPerson}/>
      </span>
      <Button type="submit">Submit form</Button>
    </Form> 
  )
}

const createNewActivity = (a: IActivity)=> { }
const getActivities = ():IActivity[] => {
  return [
    {
      id: "1",
      description: "getting ready for work"
    },
    {
      id: "2",
      description: "working"
    },
    {
      id: "3",
      description: "eating"
    },
    {
      id: "4",
      description: "sleeping"
    },
    {
      id: "5",
      description: "working out"
    }
  ]
}
const createNewPerson = (a: IPerson): void => {}
const createNewPlace = (a: IPlace): void => {}
const getPlaces = ():IPlace[] => { return [
  {
    id: "1",
    description: "home"
  },
  {
    id: "2",
    description: "work"
  },
  {
    id: "3",
    description: "school"
  },
  {
    id: "4",
    description: "gym"
  }
]};

const getPeople = ():IPerson[] => { return [
  {
    id: "1",
    name: "August"
  },
  {
    id: "2",
    name: "Ellie"
  },
  {
    id: "3",
    name: "Shane"
  }
]};