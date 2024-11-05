import { useCallback, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addPerson, getAllPeople, updatePersonName, deletePerson, setNotes } from '../../state/people/people-slice'
import { ThingHub } from '../../features'


export const People = () => {
  const people = useAppSelector(getAllPeople);
  const things = useMemo(() => Object.values(people).map((person) => {
    return { id: person.id, userEnteredName: person.name, notes: person.notes }
  }
  ), [people]);

  const dispatch = useAppDispatch();

  const onCreate = useCallback((userEnteredName: string) => {
    dispatch(addPerson({ person: { name: userEnteredName } }));
  }, [dispatch]);

  const onEdit = useCallback((id: string, newText: string) => {
    dispatch(updatePersonName({ id, name: newText }));
  }, [dispatch]);

  const onDelete = useCallback((id: string) => {
    dispatch(deletePerson({ id }));
  }, [dispatch]);

  const onNotes = useCallback((id: string, notes: string) => {
    dispatch(setNotes({ id, notes }));
  }, [dispatch]);



  return <ThingHub title="People" onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} things={things} instructions='Enter the name of someone new ...' onNotes={onNotes} />
}
