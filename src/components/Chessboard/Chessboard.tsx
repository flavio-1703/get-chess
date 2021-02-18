import React, {useEffect, useRef, useState} from 'react';
//style
import './styles/Chessboard.css';
import Tile from '../Tile/Tile';
//the vertical and horisontal axis of the chessboard
const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const yAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface Piece {
    image: string;
    xPos: number;
    yPos: number;
}

//i know this is terrible and redundant
//i could use string interpolation on this but im not using local assets so this will do for now

//initial board state
const initalBoardState: Piece[] = [];
for(let i: number = 0; i < 8; i++){

    initalBoardState.push({
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png", 
        xPos: i, 
        yPos: 6});
};

            //white pawns
for(let i: number = 0; i < 8; i++){

initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png", 
    xPos: i, 
    yPos: 1});
};

//white rooks
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    xPos: 7,
    yPos: 0    
});

initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    xPos: 0,
    yPos: 0    
});

//black rooks
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    xPos: 0,
    yPos: 7    
});

initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    xPos: 7,
    yPos: 7    
});

//white knights
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    xPos: 1,
    yPos: 0    
});

initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    xPos: 6,
    yPos: 0    
});


//black knights
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    xPos: 1,
    yPos: 7   
});

initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    xPos: 6,
    yPos: 7    
});

//white bishop
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    xPos: 2,
    yPos: 0   
});

initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    xPos: 5,
    yPos: 0    
});

//black bishops
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    xPos: 2,
    yPos: 7   
});

initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    xPos: 5,
    yPos: 7    
});

//white king
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
    xPos: 4,
    yPos: 0    
});

//white queen
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
    xPos: 3,
    yPos: 0    
});

//black king
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
    xPos: 4,
    yPos: 7   
});

//black queen
initalBoardState.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
    xPos: 3,
    yPos: 7   
});


const Chessboard: React.FC = () => {
    const [activePiece, setActivePiece] = useState<HTMLElement | null >(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState <Piece[]>(initalBoardState);

    const chessboardRef = useRef<HTMLDivElement>(null);
    
    

    const grabPiece = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if(element.classList.contains('chesspiece') && chessboard) 
        {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs( Math.ceil((e.clientY - chessboard.clientTop - 800) / 100 )));
            //this makes it so when you click the piece it takes the piece
            //to the center of the mouse
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top  = `${y}px`;

            setActivePiece(element);
        }
    };

    //this makes so that the piece follows your mouse on grab
    const movePiece = (e: React.MouseEvent) => {
        const chessboard = chessboardRef.current;

        if(activePiece && chessboard)
        {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.offsetHeight - 75;

            const x = e.clientX -50;
            const y = e.clientY - 50;
            activePiece.style.position = 'absolute';
            //activePiece.style.left = `${x}px`;
            //activePiece.style.top  = `${y}px`;

            //this statemants prevent the selected piece from 
            //going beyond the board
            if (x < minX)
            {
                activePiece.style.left = `${minX}px`;
            }
            else if (x > maxX)
            {
                activePiece.style.left = `${maxX}px`;
            }
            else
            {
                activePiece.style.left = `${x}px`;
            }
            
            
            if (y < minY)
            {
                activePiece.style.top = `${minY}px`;
            }
            else if (y > maxY)
            {
                activePiece.style.top = `${maxY}px`;
            }
            else
            {
                activePiece.style.top = `${y}px`;
            }


           
        }
    };

    //this make so when you release the piece it drops
    //works by simply by make the piece no loner active
    const dropPiece = (e: React.MouseEvent) => {
        //here we get the pieces' position relative to the board
        const chessboard = chessboardRef.current;

        if(activePiece && chessboard) 
        {
            //relative position
            //the math gives us grid positions
            const dpp_x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const dpp_y = Math.abs( Math.ceil((e.clientY - chessboard.clientTop - 800) / 100 ));

            setPieces((value) => {
            const pieces = value.map((p) => {
                    if (p.xPos === gridX && p.yPos === gridY) {
                           p.xPos = dpp_x;
                           p.yPos = dpp_y;
                    }
                        return p;
                    }
                );
                return pieces;
            });

            setActivePiece(null);
        }
    } 


    

    let board:any = [];
    {/*This forloop renders the white and black tiles  */}
    for(let j: number = yAxis.length - 1; j >= 0; j--){
        for(let i: number = 0; i < xAxis.length; i++){

            let number: number = j + i + 2;
            let image = undefined;

            pieces.forEach(p => {
                if(p.xPos === i && p.yPos === j) {
                    image = p.image;
                }
            });
            board.push(
            <Tile
                key={`${j}, ${i}`}
                number={number} 
                image={image} 
            />
                );
        }
    }

    return (
        <div
        ref={chessboardRef}
        onMouseUp={(e) => dropPiece(e)} 
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        className="chessboard">
            {board}
        </div>
    )
}

export default Chessboard;