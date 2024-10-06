import React, {useCallback, useMemo, useState} from 'react'
import { IHaveId, IPerson } from '../../types';
import { Form, Button } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { getAllPeople } from '../../state/people/people-slice';

interface IProps {
    onChange: (person: (IPerson & IHaveId)[]) => void;
}

export const PersonSelect = (props: IProps) => {
    const people = useAppSelector(getAllPeople);
    const {onChange} = props
    const [selectedPeople, setSelectedPeople] = useState<{[id: string]: boolean}>({})


    const onSelectorChange = useCallback((
        person: IPerson & IHaveId,
        isSelected: boolean,
    ) => {
       selectedPeople[person.id] = isSelected
        onChange(Object.values(people).filter(person => selectedPeople[person.id] === true));
    },[selectedPeople, setSelectedPeople]);


    const selectors = useMemo(() => Object.values(people).map(
        (person, index) => 
        <PersonSelector
            onChange={onSelectorChange}
            key={index}
            person={person}
        />
    ), [onSelectorChange, people])

        return (
        <>
            {selectors}
        </>
    )
}

interface IPersonSelectorProps {
    person: IPerson & IHaveId;
    onChange: ( person: (IPerson & IHaveId), isSelected: boolean) => void;
}

const PersonSelector = (props: IPersonSelectorProps) => {
    
    const {person, onChange} = props
    const [isSelected, setIsSelected] = useState(false)
    const onClick = useCallback(() =>
        {
            setIsSelected(!isSelected)
            onChange(person, !isSelected)
        },
    [isSelected, setIsSelected]);
    
        return (
        <Button onClick={onClick} variant={isSelected ? "secondary" : "outline-secondary"} className="m-2">
            {person.name}
            {isSelected && <span className="ms-2">✖</span>}
        </Button>
    )
}
