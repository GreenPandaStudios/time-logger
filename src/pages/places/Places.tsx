import { useCallback, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addPlace, getAllPlaces, updatePlaceDescription, deletePlace} from '../../state/places/places-slice'
import { ThingHub } from '../../features'

export const Places = () => {
  const places = useAppSelector(getAllPlaces);

  const things = useMemo(() => Object.values(places).map((place) =>
    ({ id: place.id, userEnteredName: place.description })), [places]);

  const dispatch = useAppDispatch();

  const onCreate = useCallback((userEnteredName: string) => {
    dispatch(addPlace({ place: { description: userEnteredName } }));
  }, [dispatch]);

  const onEdit = useCallback((id: string, newText: string) => {
    dispatch(updatePlaceDescription({ id, description: newText }));
  }, [dispatch]);

  const onDelete = useCallback((id: string) => {
    dispatch(deletePlace({ id }));
  }, [dispatch]);

  return <ThingHub  onDelete={onDelete}  onEdit={onEdit} onCreate={onCreate} things={things} instructions='Enter the name of a new place ...'/>;
}
