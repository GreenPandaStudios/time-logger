import React, { useCallback, useState, useMemo } from 'react'

import { Form, Button, Container, NavLink } from "react-bootstrap"
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

  const [currentActivity, setCurrentActivity] = useState<IActivity | undefined>(undefined);
  const [currentPlace, setCurrentPlace] = useState<IPlace | undefined>(undefined);
  const [currentPeople, setCurrentPeople] = useState<IPerson[]>([]);

  const getCurrentAsExperience = useCallback((startTime?: number) => {
    return {
      activity: currentActivity,
      place: currentPlace,
      people: currentPeople,
      start: startTime ?? Date.now()
    } as IExperience
  }, [currentActivity, currentPlace, currentPeople])


  const dispatch = useAppDispatch();

  const onActivityChange = useCallback((activity: IActivity) => {
    setCurrentActivity(activity)
  }, [setCurrentActivity])

  const onPlaceChange = useCallback((place: IPlace) => {
    setCurrentPlace(place);
  }, [setCurrentPlace])

  const onPeopleChange = useCallback((people: IPerson[]) => {
    setCurrentPeople(people);
  }, [setCurrentPeople])

  const canSubmit = useMemo(() => {
    return currentActivity !== undefined || currentPlace !== undefined || currentPeople.length > 0;
  }, [currentActivity, currentPlace, currentPeople.length])

  const currentString: string | undefined = useMemo(() => {


    let experienceString = currentActivity?.description ?? "";
    if (currentPlace?.description) {
      experienceString += ` at ${currentPlace.description}`;
    }
    
    if (currentPeople && currentPeople.length > 0) {
      let peopleString = currentPeople.map((person) => person.name).join(", ");
      experienceString += ` with ${peopleString}`;
    }
    return experienceString;

  },[currentActivity, currentPlace, currentPeople]);



  const onSubmit = useCallback((minutesAgo: number) => {

    const startTime = Date.now() - minutesAgo * 60 * 1000;

    dispatch(addExperience({ experience: getCurrentAsExperience(startTime)}))
  }, [dispatch, addExperience, getCurrentAsExperience, setCurrentActivity, setCurrentPlace, setCurrentPeople])

  return (
    <div className="LogTime">
      <ActivitySelect onChange={onActivityChange} />
      <PlaceSelect onChange={onPlaceChange} />
      <PersonSelect onChange={onPeopleChange} />
      <Container className="d-flex justify-content-center mt-3">
        <Button onClick={()=>onSubmit(0)} disabled={!canSubmit} variant="success" className="w-100">
          {canSubmit ? 
          <><i className="bi bi-plus"></i> {currentString}</> : <>Select an activity, place, or person</>}
        </Button>
      </Container>
      <Container className="d-flex justify-content-center mt-3">
      {canSubmit &&
        <>
        <Button onClick={()=>onSubmit(5)} disabled={!canSubmit} variant='outline-dark' className="w-100">
          +5 minutes
        </Button>
        <Button onClick={()=>onSubmit(15)} disabled={!canSubmit} variant="outline-dark" className="w-100">
          +15 minutes
        </Button>
        <Button onClick={()=>onSubmit(30)} disabled={!canSubmit} variant="outline-dark" className="w-100">
          +30 minutes
        </Button>
        <Button onClick={()=>onSubmit(60)} disabled={!canSubmit} variant="outline-dark" className="w-100">
          +60 minutes
        </Button>
        </>
        }
        </Container>
    </div>
  )
}