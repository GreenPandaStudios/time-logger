import React, { useCallback, useState, useMemo } from 'react'

import { Form, Button, Container } from "react-bootstrap"
import { IActivity, IPerson, IPlace, IExperience } from '../../types'
import { ActivitySelect } from './ActivitySelect'
import { PlaceSelect } from './PlaceSelect'
import { PersonSelect } from './PersonSelect'
import { useAppDispatch } from '../../app/hooks'
import { addExperience } from '../../state/experiences/experience-slice'

interface IExperienceLog {
  activity?: IActivity;
  place?: IPlace;
  people?: IPerson[];
}



export const LogTime = () => {


  const [currentExperience, setCurrentExperience] = useState<IExperienceLog>({})

  const getCurrentAsExperience: IExperience = useMemo(() => {
    return {
      activity: currentExperience.activity,
      place: currentExperience.place,
      people: currentExperience.people,
      start: Date.now()
    } as IExperience
  }, [currentExperience])




  const dispatch = useAppDispatch();

  const onActivityChange = useCallback((activity: IActivity) => {
    setCurrentExperience({
      ...currentExperience,
      activity: activity
    })
  }, [currentExperience])

  const onPlaceChange = useCallback((place: IPlace) => {
    setCurrentExperience({
      ...currentExperience,
      place: place
    })
  }, [currentExperience])

  const onPeopleChange = useCallback((people: IPerson[]) => {
    setCurrentExperience({
      ...currentExperience,
      people: people
    })
  }, [currentExperience.activity, currentExperience.place, currentExperience.people])

  const canSubmit = useMemo(() => {
    return currentExperience.activity !== undefined && currentExperience.place !== undefined;
  }, [currentExperience.activity, currentExperience.place])

  const currentString: string | undefined = useMemo(() => {


    let experienceString = `${currentExperience.activity?.description} at ${currentExperience.place?.description}`; 
    
    if (currentExperience.people && currentExperience.people.length > 0) {
      let peopleString = currentExperience.people.map((person) => person.name).join(", ");
      experienceString += ` with ${peopleString}`;
    }
    return experienceString;

  },[currentExperience]);



  const onSubmit = useCallback(() => {
    dispatch(addExperience({ experience: getCurrentAsExperience }))
    setCurrentExperience({} as IExperienceLog);
  }, [dispatch, addExperience, getCurrentAsExperience])

  return (
    <Form onSubmit={onSubmit}>
      <ActivitySelect onChange={onActivityChange} />
      <PlaceSelect onChange={onPlaceChange} />
      <PersonSelect onChange={onPeopleChange} />
      <Container className="d-flex justify-content-center mt-3">
        {canSubmit &&
        <Button type="submit" disabled={!canSubmit} variant="outline-success" className="w-100">
          <i className="bi bi-plus"></i> Log "{currentString}"
        </Button>
    }
      </Container>
    </Form>
  )
}