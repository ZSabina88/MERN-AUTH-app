export default function Container({ children }) {
    return (
        <main className="container flex__column">
            <h1>Qencode</h1>
            <div className="container__box">
                {children}
            </div>
        </main>
    );
}
