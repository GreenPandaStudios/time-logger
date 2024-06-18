import React, {useCallback, useMemo, useState} from 'react'
import { IPerson } from '../../types';
import { Form, Button } from 'react-bootstrap';

interface IProps {
    people: IPerson[];
    createNewPerson: (person: IPerson) => void;
}

export const PersonSelect = (props: IProps) => {

    const [numberOfPeople, setNumberOfPeople] = useState<IProps[]>([])

    const {people, createNewPerson} = props
    const addPerson = useCallback(() => setNumberOfPeople([...numberOfPeople, props]) ,[setNumberOfPeople, numberOfPeople])

        return (
        <>
            {
                numberOfPeople.map(
                    (person, index)=> 
                    <PersonSelector {...person} prefix = {index === 0 ? " with" : " and"} key={index}/>
                )
            }
            <Button onClick={addPerson}>{numberOfPeople.length === 0 ? " with ..." : " and ..."}</Button>
        </>
    )
}

interface IPersonSelectorProps extends IProps {
    prefix: string;
}

const PersonSelector = (props: IPersonSelectorProps) => {

    const {people, createNewPerson, prefix} = props
    const mapPeople = useMemo(() => {
        return people.map(person => {
            return <option key={person.id} value={person.id}>{person.name}</option>
        })
        }, [people])
    
        return (
        <>   
            {prefix +" "}
            <Form.Select>
                <option>Choose a person...</option>
                {mapPeople}
            </Form.Select>
        </>
    )
}
