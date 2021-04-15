import React from 'react'
import ChessComp from './ChessComp'
import './BoardComp.css'
import { ChessType } from '../types/enums'


interface Iprops {
    Chesses: ChessType[],
    isGameOver?:Boolean,
    onClick?: (i: number) => void
}
export default function BoardComp(props:Iprops) {
    // 棋盘, 提供棋子
    const list = props.Chesses.map((item, i) => <ChessComp 
        key={i}
        type = {item}
        onClick = {() => {
            // 有回调函数传递进来，并且游戏还没结束，空白的地方才能被点击
            if (props.onClick && !props.isGameOver) {
                props.onClick(i)
            }
        }}
    />)
    return (
        <div className="board">
            {list}
        </div>
    )
}
