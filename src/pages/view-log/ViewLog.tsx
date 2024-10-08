import React, {useCallback, useMemo} from 'react'
import { useAppSelector } from '../../app/hooks';
import { getAllExperiences } from '../../state';
import { ViewExperience } from './ViewExperience';
import { ListGroup } from 'react-bootstrap';
import { LogTime } from '../log-time';
import { useDispatch } from 'react-redux';
import { setRating } from '../../state/experiences/experience-slice';

export const ViewLog = () => {
    const dispatch = useDispatch();
    const experiences = useAppSelector(getAllExperiences);
    const handleSetRating = useCallback((id: string, rating: number) => {
        dispatch(setRating({id, rating}));
    }, [dispatch]);
    const logView = useMemo(()=> {
        if (experiences.length === 0) {
            return null;
        }
        return experiences.map((_,index) => {
            const experience = experiences[experiences.length - 1 - index];
            return <ViewExperience experience={experience} key={experience.id}
            setRating={(rating)=>handleSetRating(experience.id, rating)}/>
        })
    }, [experiences]);


  return (
    <ListGroup>
      <ListGroup.Item>
        <LogTime/>
      </ListGroup.Item>
      {logView}
    </ListGroup>
  )
}


