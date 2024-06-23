import React, {useMemo, useCallback} from 'react'
import { IPlace, IHaveId } from '../../types';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { getAllPlaces } from '../../state/places/places-slice';

interface IProps {
    onChange: (place: (IPlace & IHaveId)) => void;
}

export const PlaceSelect = (props: IProps) => {

    const places = useAppSelector(getAllPlaces)
    const {onChange} = props
    const onOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(places[event.target.value]);
     },[onChange, places]);

    const mapPeople = useMemo(() => {
        return Object.values(places).map(place => {
            return <option key={place.id} value={place.id}>{place.description}</option>
        })
        }, [places])
    
        return (
        <Form.Select onChange={onOptionChange}>
            <option>Choose a place...</option>
            {mapPeople}
        </Form.Select>
    )
}
