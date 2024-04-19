import classNames from "classnames";

export default function Button({ type, icon, text, onClick, smallBtn, largeBtn, largeBlueBtn, disabled }) {
    const classes = classNames(
        {
            "flex__row button__small": smallBtn,
            "button__large": largeBtn,
            "button__large btn__color": largeBlueBtn,
        }
    );

    return (
        <button className={`button ${classes}`} type={type} onClick={onClick} disabled={disabled}>
            {icon}<p>{text}</p>
        </button>
    );
}
