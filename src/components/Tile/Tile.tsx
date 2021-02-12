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
                {/*passing the image as a background image so we dont drag image files.
                also if the tile doesnt contain an image we should not render an
                undefined image */}
                {image && <div
                className="chesspiece" 
                style={{backgroundImage: `url(${image})`}}>
                </div>}
            </div>
        );
    }else {
        return (
            <div className="tile white__tile">
                {image && <div
                className="chesspiece" 
                style={{backgroundImage: `url(${image})`}}>
                </div>}
            </div>
        ); 
    }
}

export default Tile;