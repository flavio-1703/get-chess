import React from 'react';
//style
import './styles/Chessboard.css';
import Tile from '../Tile/Tile';
//the vertical and horisontal axis of the chessboard
const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const yAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];


const Chessboard: React.FC = () => {

    let board:any = [];
    {/*This forloop renders the white and black tiles  */}
    for(let j: number = yAxis.length - 1; j >= 0; j--){
        for(let i: number = 0; i < xAxis.length; i++){
            
            let number: number = j + i + 2;
            board.push(<Tile
                number={number} 
                image="../../"/>);
        }
    }

    return (
        <div className="chessboard">
            {board}
        </div>
    )
}

export default Chessboard;