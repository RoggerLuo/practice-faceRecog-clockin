import React,{createClass} from 'react';
import s from './style.css'
import icon from '../../../assets/font/iconfont.css'

const Character = ({text,click}) => {
    return (
        <div className={s.character}>
            <span className={s.name}>{text}test</span>
            <span className={s.cross} onClick={click}>
                <i className={icon.iconfont+' '+icon['icon-guanbi2fill']+' '+s['icon-guanbi2fill']}></i>
            </span>
        </div>
    )
}

//iconfont icon-guanbi2fill"
export default Character