function Square({position, color, width, height, piece}){
    return <button className="Square" style={{ backgroundColor: `${color}`, width: `${width}`, height: `${height}`, borderStyle: "none"}}>
        <img id={position[0]+"-"+position[1]}src={piece.image} height={`${100}%`} width={`${100}%`} alt={piece.image}></img>
</button>
}

export default function Board (props){
    var board = []; 
    const height = 500, width = 500;
    
    for (let i = 0; i < props.rows; i++){
        const boardRow = [];
        for (let j = 0; j < props.cols; j++){
            let color = null;
            if (props.colorSwitch){
                if ((i+j)%2 === 0){
                    color = props.colorOne;
                } else {
                    color = props.colorTwo;
                }
            } else
                color = props.color;
            
            boardRow.push(<Square key={[i, j]} position={[i, j]} height={`${height/props.rows}px`} width={`${width/props.cols}px`} color={`${color}`} piece={props.board[i][j]}/>);
        }
        board.push(<div key={`${i}`} className="boardRow" style={{ display: 'flex' }}> {boardRow} </div>);
    }

    return (
        <>{board}</>
    );
}