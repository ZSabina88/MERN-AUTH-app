import Input from "./Input";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function PasswordInput({
    passwordName,
    passwordValue,
    passwordChange,
    placeholder,
    label,
    onBlur,
    onFocus }) {
    const [visible, setVisible] = useState(true);

    return (
        <>
            <Input
                name={passwordName}
                label={label}
                type={visible ? "text" : "password"}
                value={passwordValue}
                placeholder={placeholder}
                onChange={passwordChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onClick={() => setVisible(!visible)}
            >
                {visible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </Input>
        </>
    );
}
