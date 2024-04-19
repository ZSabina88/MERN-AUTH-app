export default function Input({ name, placeholder, label, value, onChange, type, onClick, onBlur, onFocus, children }) {
    return (
        <>
            <p className="label"><label htmlFor={name}>{label}</label></p>
            <div className='wrapper'>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    className='input'
                />
                <span className="icon" onClick={onClick}>{children}</span>
            </div>
        </>

    );
}
