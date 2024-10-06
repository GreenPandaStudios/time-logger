import React, {useMemo} from 'react'
import { useAppSelector } from '../../app/hooks';
import { getAllExperiences } from '../../state';
import { ViewExperience } from './ViewExperience';
import { ListGroup } from 'react-bootstrap';
import { LogTime } from '../log-time';

export const ViewLog = () => {

    const experiences = useAppSelector(getAllExperiences);

    const logView = useMemo(()=> {
        if (experiences.length === 0) {
            return null;
        }
        return experiences.map((_,index) => {
            const experience = experiences[experiences.length - 1 - index];
            return <ViewExperience experience={experience} key={experience.id}/>
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


