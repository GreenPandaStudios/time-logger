import React, {useMemo} from 'react'
import { IPlace } from '../../types';
import { Form } from 'react-bootstrap';

interface IProps {
    places: IPlace[];
    createNewPlace: (place: IPlace) => void;
}

export const PlaceSelect = (props: IProps) => {

    const {places, createNewPlace} = props
    const mapPeople = useMemo(() => {
        return places.map(place => {
            return <option key={place.id} value={place.id}>{place.description}</option>
        })
        }, [places])
    
        return (
        <Form.Select>
            <option>Choose a place...</option>
            {mapPeople}
        </Form.Select>
    )
}
