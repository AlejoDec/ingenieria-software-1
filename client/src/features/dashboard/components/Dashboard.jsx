import "../styles/Dashboard.css";
import { LowStockProductsView } from "./LowStockProductsView";

export const DashboardView = ({ sedeId }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="dashboard-content">
                <h1>Panel de Control</h1>
                <div className="summary-cards">
                    <div className="card">
                        <h3>Productos en stock</h3>
                        <p>0</p>
                    </div>
                </div>

                {/* Sección de productos con bajo stock */}
                <LowStockProductsView />
            </div>
        </div>
    );
}

