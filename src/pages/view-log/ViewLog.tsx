import React, { useCallback, useMemo } from 'react'
import { useAppSelector } from '../../app/hooks';
import { getAllExperiences } from '../../state';
import { ViewExperience } from './ViewExperience';
import { ListGroup } from 'react-bootstrap';
import { LogTime } from '../log-time';
import { useDispatch } from 'react-redux';
import { setRating, setCognitiveFunction } from '../../state/experiences/experience-slice';
import { ExportImportData } from './ExportImportData';

export const ViewLog = () => {
  const dispatch = useDispatch();
  const experiences = useAppSelector(getAllExperiences);

  const handleSetRating = useCallback((id: string, rating: number) => {
    dispatch(setRating({ id, rating }));
  }, [dispatch]);

  const handleSetCognitiveFunction = useCallback((id: string, cognitiveFunction: number) => {
    dispatch(setCognitiveFunction({ id, cognitiveFunction }));
  }, [dispatch]);

  const logView = useMemo(() => {
    if (experiences.length === 0) {
      return null;
    }
    return experiences.map((_, index) => {
      const experience = experiences[experiences.length - 1 - index];

      return <ViewExperience experience={experience} key={experience.id}
        setRating={(rating) => handleSetRating(experience.id, rating)}
        setCognitiveFunction={(cognitiveFunction) => handleSetCognitiveFunction(experience.id, cognitiveFunction)} />
    })
  }, [experiences]);


  return (
    <ListGroup>
      <ExportImportData />
      <LogTime />
      {logView}
    </ListGroup>
  )
}


