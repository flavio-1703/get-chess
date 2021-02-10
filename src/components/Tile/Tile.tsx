import { type } from 'os';
import React from 'react';
//style
import './styles/Tile.css';

interface Props {
    image?: string;
    number: number;
};

const Tile: React.FC<Props> = ({number, image}) => {

    if (number % 2 === 0) {
        return (
            <div className="tile black__tile">
                <img src={image} />
            </div>
        );
    }else {
        return (
            <div className="tile white__tile">
                <img src={image} />
            </div>
        );
    }
}

export default Tile;