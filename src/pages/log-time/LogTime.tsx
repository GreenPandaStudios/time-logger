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
  }, [currentExperience])

  const canSubmit = useMemo(() => {
    return currentExperience.activity !== undefined && currentExperience.place !== undefined;
  }, [currentExperience])

  const onSubmit = useCallback(() => {
    dispatch(addExperience({ experience: getCurrentAsExperience }))
    setCurrentExperience({} as IExperienceLog);
  }, [dispatch, addExperience, getCurrentAsExperience])

  return (
    <Form onSubmit={onSubmit}>
      <Container>
        <span>
          I am {" "}
          <ActivitySelect onChange={onActivityChange} />
          {" "} at {" "}
          <PlaceSelect onChange={onPlaceChange} />
          <PersonSelect onChange={onPeopleChange} />
        </span>
      </Container>
      <Button type="submit" disabled={!canSubmit}>Submit form</Button>
    </Form>
  )
}