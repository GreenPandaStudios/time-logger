import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

interface RatingScaleProps {
    title: string;
    icons: string[];
    selectedRating: number | undefined;
    onRatingSelect: (rating: number) => void;
}

const RatingScale: React.FC<RatingScaleProps> = (props: RatingScaleProps) => {

    const {icons, onRatingSelect, selectedRating} = props;

    return (
        <div className="ratingScale text-center">
            <p className='ratingScaleTitle text-center'>{props.title}</p>
            <div className="ratingButtonWrapper">
            {icons.map((icon, index) => (
          
                <Button
                className={index === selectedRating ? "ratingButton selected" : "ratingButton"}
                onClick={() => onRatingSelect(index)}>
                <i className={"bi " + icon}></i>
                </Button>
            ))}
             </div>
        </div>
    );
};

export default RatingScale;