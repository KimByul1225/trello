import React, { useRef } from 'react';
import {Droppable} from "react-beautiful-dnd";
import DraggableCard from './DraggableCard';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
    display: flex;
    flex-direction: column;

`
const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

interface IAreaProps{
    isDraggingOver: boolean;
    isDraggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
    padding: 20px;
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThisWith? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
`

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({toDos, boardId}: IBoardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        inputRef.current?.focus();
        setTimeout(() => {inputRef.current?.blur()}, 5000)
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <input 
                type="text" 
                placeholder="작성해주세요." 
                ref={inputRef}
            />
            <button onClick={onClick}>입력</button>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                <Area 
                //snapthot을 통해 드래해서 board로 들어오고 떠났는지 여부를 styled 컴포넌트로 넘긴다.
                isDraggingOver={snapshot.isDraggingOver} 
                isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef} 
                {...provided.droppableProps}>
                    {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo} index={index} toDo={toDo} />
                    ))}
                    {provided.placeholder}
                </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;