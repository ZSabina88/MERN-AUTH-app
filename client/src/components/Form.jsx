export default function Form({ title, method, children, onSubmit }) {
    return (
        <section className="flex__column">
            <h2>{title}</h2>
            <form className="form__container" method={method} onSubmit={onSubmit}>{children}</form>
        </section>
    );
}
