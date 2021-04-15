import React from 'react'
import './GameStatusComp.css'
import { ChessType, GameStatus } from '../types/enums'

interface Iprops {
    isGameOver:GameStatus,
    next: ChessType.black | ChessType.red
}
export default function GameStatusComp(props:Iprops) {
    let content
    if (props.isGameOver === GameStatus.gameing) {
        if (props.next === ChessType.red) {
            content = <div className="red">红方落子</div>
        }
        else {
            content = <div className="black">黑方落子</div>
        }
    } else {
        if (props.isGameOver === GameStatus.redWin) {
            content = <div className="win red">红方胜利</div>
        } else if (props.isGameOver === GameStatus.blackWin) {
            content = <div className="win black">黑方胜利</div>
        } else {
            content = <div className="win equal">平局</div>
        }
    }
    return (
        <div className="status"> 
            {content}
        </div>
    )
}
