//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

//Thư viện internor sau(thư viên bên trong dự án)
import styles from './ModalChooseFavorite.module.scss';

const cx = classNames.bind(styles);

let arr = []
function Item({ name, onClickAdd, onClickSub, setArrSubmit}) {
    const [color, setColor] = useState(false)
    const item = useRef()

    const handleChangeColorBorder = () => {
        if(color === false) {
            setColor(true)
            onClickAdd()
            arr.push(name)
        } else {
            setColor(false)
            onClickSub()
            function removeItem(array, item){
                for(var i in array){
                    if(array[i]===item){
                        array.splice(i,1);
                        break;
                    }
                }
            }
            removeItem(arr, name);
        }
        setArrSubmit(arr)
    }

    useEffect(() => {
        if(color) {
            item.current.classList.add(cx('clicked'))
        } else {
            item.current.classList.remove(cx('clicked'))
        }
    },[color])


    return (
        <div className={cx('discovery-item')}>
            <div className={cx('discovery-item-container')} onClick={handleChangeColorBorder} ref={item}>
                <p className={cx('discovery-item-text')}>{name}</p>
            </div>
        </div>
    );
}

export default Item;
