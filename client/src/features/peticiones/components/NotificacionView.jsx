import React from 'react';
import { BellIcon, XIcon, CheckIcon } from "../../../components/shared/Icons.jsx";
import '../styles/Notificaciones.css';

export const NotificacionView = ({
    isSocketConnected,
    notifications,
    unreadCount,
    isPanelOpen,
    onNotificationClick,
    onRemoveNotification,
    onTogglePanel,
    onClearAll
}) => {
    const unreadNotifications = notifications.filter(n => !n.read);
    const readNotifications = notifications.filter(n => n.read);

    return (
        <div className="notification-container">
            {/* Botón flotante */}
            <button
                onClick={onTogglePanel}
                className="notification-button"
                aria-label="Notificaciones"
            >
                <BellIcon className="notification-icon text-white" />
                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Panel de notificaciones */}
            {isPanelOpen && (
                <div className="notification-panel">
                    {/* Encabezado */}
                    <div className="notification-header">
                        <h3 className="notification-title">Notificaciones</h3>
                        <div className="notification-actions">
                            <button
                                onClick={onClearAll}
                                className="notification-action-clear"
                            >
                                <CheckIcon className="notification-small-icon mr-1" />
                                Limpiar todo
                            </button>
                            <button
                                onClick={onTogglePanel}
                                className="notification-action-close"
                                aria-label="Cerrar panel"
                            >
                                <XIcon className="notification-close-icon" />
                            </button>
                        </div>
                    </div>

                    {/* Estado de conexión */}
                    {!isSocketConnected && (
                        <div className="notification-connection-status">
                            <XIcon className="notification-small-icon mr-2" />
                            <span>Conexión en tiempo real no disponible</span>
                        </div>
                    )}

                    {/* Lista de notificaciones */}
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="notification-empty">
                                No hay nuevas notificaciones
                            </div>
                        ) : (
                            <>
                                {unreadNotifications.length > 0 && (
                                    <div className="notification-group">
                                        <div className="notification-group-header">
                                            Nuevas ({unreadNotifications.length})
                                        </div>
                                        {unreadNotifications.map(notification => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                isUnread={true}
                                                onClick={onNotificationClick}
                                                onRemove={onRemoveNotification}
                                            />
                                        ))}
                                    </div>
                                )}

                                {readNotifications.length > 0 && (
                                    <div>
                                        <div className="notification-group-header text-gray-600">
                                            Anteriores ({readNotifications.length})
                                        </div>
                                        {readNotifications.map(notification => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                isUnread={false}
                                                onClick={onNotificationClick}
                                                onRemove={onRemoveNotification}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const NotificationItem = ({ notification, isUnread, onClick, onRemove }) => {
    // Valores por defecto para evitar errores
  const sedeOrigenNombre = notification.sede_origen?.nombre || 'Sede origen';
  const solicitante = notification.solicitante || 'Usuario';
    return (<div
        onClick={() => onClick(notification.id)}
        className={`notification-item ${isUnread ? 'notification-item-unread' : ''}`}
    >
        <div className="notification-content">
            <div className="notification-text">
                <div className="notification-message">
                    {isUnread && (
                        <span className="notification-unread-indicator"></span>
                    )}
                    <h4 className={`${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                        Solicitud de traslado
                    </h4>
                </div>

                <div className="notification-details">
                    <div className="notification-detail">
                        <span className="notification-detail-label">Producto:</span>
                        <span>ID-{notification.producto_id}</span>
                    </div>
                    <div className="notification-detail">
                        <span className="notification-detail-label">Cantidad:</span>
                        <span>{notification.cantidad}</span>
                    </div>
                    <div className="notification-detail">
                        <span className="notification-detail-label">Origen:</span>
                        <span className="truncate">{notification.sede_origen.nombre}</span>
                    </div>
                    <div className="notification-detail">
                        <span className="notification-detail-label">Solicitante:</span>
                        <span className="truncate">{notification.solicitante}</span>
                    </div>
                </div>

                <div className="notification-time">
                    {new Date(notification.fecha).toLocaleString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>

            <button
                onClick={(e) => onRemove(notification.id, e)}
                className="notification-remove"
                aria-label="Eliminar notificación"
            >
                <XIcon className="notification-small-icon" />
            </button>
        </div>
    </div>);

}