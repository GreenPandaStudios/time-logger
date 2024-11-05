import React, { useMemo, useCallback } from 'react'
import { IPlace, IHaveId } from '../../types';
import { Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllPlaces, addCoordinatesToPlace } from '../../state/places/places-slice';
import { useLocation } from '../../features/location';

interface IProps {
    onChange: (place: (IPlace & IHaveId)) => void;
}

export const PlaceSelect = (props: IProps) => {
    const dispatch = useAppDispatch();
    const { location } = useLocation();
    const places = useAppSelector(getAllPlaces)
    const { onChange } = props
    const onOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const place = places[event.target.value];
        if (location != null && place) {
            dispatch(addCoordinatesToPlace(
                { id: place.id, ...location }
            ));
        }
        onChange(place);
    }, [onChange, places, addCoordinatesToPlace, location]);

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
