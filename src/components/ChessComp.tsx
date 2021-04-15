import React from 'react'
import './ChessComp.css'
import { ChessType } from '../types/enums'
// 定义棋子的状态

interface Iprops {
    type: ChessType,
    onClick?: () => void
}
// 棋子
export default function ChessComp(props:Iprops) {
    let chess = null
    if (props.type === ChessType.red ) {
        chess = <div className="red chess-item"></div>
    } else if (props.type === ChessType.black) {
        chess = <div className="black chess-item"></div>
    }
    return (
        // 棋子有什么属性或事件？需要通过外界传递进来 type onclick
        <div className="chess" onClick = {() => {
            if (props.type === ChessType.none && props.onClick) {
                props.onClick()
            }
        }}>
            {chess}
        </div>
    )
}
