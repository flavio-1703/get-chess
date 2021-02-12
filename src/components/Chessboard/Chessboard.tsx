import React, {useRef} from 'react';
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

const pieces: Piece[] = [];
//i know this is terrible and redundant
//i could use string interpolation on this but im not using local assets so this will do for now

//Black pawns
for(let i: number = 0; i < 8; i++){

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png", 
    xPos: i, 
    yPos: 6});
};

//white pawns
for(let i: number = 0; i < 8; i++){

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png", 
    xPos: i, 
    yPos: 1});
};

//white rooks
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    xPos: 7,
    yPos: 0    
});

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    xPos: 0,
    yPos: 0    
});

//black rooks
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    xPos: 0,
    yPos: 7    
});

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    xPos: 7,
    yPos: 7    
});

//white knights
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    xPos: 1,
    yPos: 0    
});

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    xPos: 6,
    yPos: 0    
});


//black knights
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    xPos: 1,
    yPos: 7   
});

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    xPos: 6,
    yPos: 7    
});

//white bishop
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    xPos: 2,
    yPos: 0   
});

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    xPos: 5,
    yPos: 0    
});

//black bishops
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    xPos: 2,
    yPos: 7   
});

pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    xPos: 5,
    yPos: 7    
});

//white king
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
    xPos: 4,
    yPos: 0    
});

//white queen
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
    xPos: 3,
    yPos: 0    
});

//black king
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
    xPos: 4,
    yPos: 7   
});

//black queen
pieces.push({
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
    xPos: 3,
    yPos: 7   
});


const Chessboard: React.FC = () => {
    
    const chessboardRef = useRef<HTMLDivElement>(null);
    
    let activePiece: HTMLElement | null  = null;

    const grabPiece = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        if(element.classList.contains('chesspiece')) 
        {
            //this makes it so when you click the piece it takes the piece
            //to the center of the mouse
            const x = e.clientX -50;
            const y = e.clientY - 50;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top  = `${y}px`;

            activePiece = element;
        }
    };

    //this makes so that the piece follows your mouse on grab
    const movePiece = (e: React.MouseEvent) => {
        const chessboard = chessboardRef.current;

        if(activePiece && chessboard)
        {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetWidth - 25;
            const maxY = chessboard.offsetHeight - 25;

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
        if(activePiece) 
        {
            activePiece = null;
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