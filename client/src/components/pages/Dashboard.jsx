export const Dashboard = ({ user, inventoryData }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="dashboard-content">
                <h1>Panel de Control</h1>
                <div className="summary-cards">
                    <div className="card">
                        <h3>Productos en stock</h3>
                        <p>0</p>
                    </div>
                    {/* Más tarjetas según tus necesidades */}
                </div>
            </div>
            <div className="summary-cards"></div>
        </div>
    );
}

