import React, {useCallback, useMemo, useState} from 'react'
import { IHaveId, IPerson } from '../../types';
import { Form, Button } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { getAllPeople } from '../../state/people/people-slice';

interface IProps {
    onChange: (person: (IPerson & IHaveId)[]) => void;
}

export const PersonSelect = (props: IProps) => {

    const [selectedPeople, setSelectedPeople] = useState<(IPerson | undefined)[]>([])

    const people = useAppSelector(getAllPeople)
    const {onChange} = props

    const addPerson = useCallback(() =>  {
        setSelectedPeople([...selectedPeople, undefined])
    
    },[setSelectedPeople, selectedPeople])
    const removePerson = useCallback(() => {
        if (selectedPeople.length === 1) {
            setSelectedPeople([]);
            return;
        }
        setSelectedPeople(selectedPeople.slice(0,selectedPeople.length-1))
    },[setSelectedPeople, selectedPeople]);

    
    const onPersonSelectChange = useCallback((
        person:IPerson & IHaveId,
        index: number
    ) => {
        let newSelectedPeople = [...selectedPeople]
        newSelectedPeople[index] = person;
        setSelectedPeople(newSelectedPeople)
        onChange(newSelectedPeople.filter(p => p !== undefined) as (IPerson & IHaveId)[])
    },[selectedPeople, setSelectedPeople, onChange]);


    const selectorMap = useMemo(()=>selectedPeople.map(
        (_, index)=> 
        <PersonSelector onChange={(p:IPerson & IHaveId) => onPersonSelectChange(p, index)} people={Object.values(people)} prefix = {index === 0 ? " with" : " and"} key={index}/>
    ),[selectedPeople, setSelectedPeople, onPersonSelectChange])

        return (
        <>
            {selectorMap}
            <Button onClick={addPerson}>{selectedPeople.length === 0 ? " with ..." : " and ..."}</Button>
            {selectedPeople.length > 0 && <Button onClick={removePerson}>Remove</Button>}
        </>
    )
}

interface IPersonSelectorProps {
    prefix: string;
    people: (IPerson & IHaveId)[];
    onChange: (person: (IPerson & IHaveId)) => void;
}

const PersonSelector = (props: IPersonSelectorProps) => {
    
    const {people, prefix, onChange} = props

    const onOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(people.find(person => person.id === event.target.value) as (IPerson & IHaveId));
     },[onChange, people]);

    const mapPeople = useMemo(() => {
        return people.map((person, index) => {
            return <option key={person.id + "_" + index} value={person.id}>{person.name}</option>
        })
        }, [people])
    
        return (
        <>   
            {prefix +" "}
            <Form.Select onChange={onOptionChange}>
                <option>Choose a person...</option>
                {mapPeople}
            </Form.Select>
        </>
    )
}
