import { DashboardView } from "../components/Dashboard";
/* import {useAuth} from "../../../contexts/AuthContext.jsx"
 */
export const DashboardContainer = ({ movimientos, loading, error }) => {
        

  return (
    <DashboardView
      movimientos={movimientos}
      loading={loading}
      error={error}
    />
  )
}

