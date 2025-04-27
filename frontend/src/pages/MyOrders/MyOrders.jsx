import React, { useState, useEffect } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      status: 'Dikirim',
      total: 125000,
      address: 'Jl. Merdeka No. 10, Jakarta',
      paymentMethod: 'Transfer Bank',
      products: [
        { name: 'Nasi Goreng Special', quantity: 2 },
        { name: 'Ayam Bakar', quantity: 1 }
      ]
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      status: 'Diproses',
      total: 75000,
      address: 'Jl. Sudirman No. 88, Bandung',
      paymentMethod: 'OVO',
      products: [
        { name: 'Burger Beef', quantity: 1 },
        { name: 'French Fries', quantity: 2 }
      ]
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      status: 'Selesai',
      total: 100000,
      address: 'Jl. Gajah Mada No. 5, Surabaya',
      paymentMethod: 'Gopay',
      products: [
        { name: 'Spaghetti Carbonara', quantity: 1 },
        { name: 'Salad Buah', quantity: 1 }
      ]
    }
  ];

  const statusTabs = ['Semua', 'Diproses', 'Dikirim', 'Selesai'];

  const filteredOrders = activeTab === 'Semua'
    ? orders
    : orders.filter(order => order.status === activeTab);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(angka);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-orders-container">
      <h1 className="my-orders-title">Pesanan Saya</h1>

      <div className="tabs">
        {statusTabs.map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="skeleton-loader">Loading orders...</div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-number">#{order.orderNumber}</span>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
              </div>
              
              <div className="order-products">
                {order.products.map((product, idx) => (
                  <div key={idx} className="product-item">
                    <div className="product-name">{product.name}</div>
                    <div className="product-quantity">x{product.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="total-text">Total Belanja:</div>
                <div className="total-price">{formatRupiah(order.total)}</div>
              </div>

              <div className="order-actions">
                <button className="detail-button" onClick={() => setSelectedOrder(order)}>Lihat Detail</button>
                {order.status === 'Dikirim' && (
                  <button className="track-button">Lacak Pesanan</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Detail Pesanan</h2>
            <p><strong>No Order:</strong> #{selectedOrder.orderNumber}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Alamat:</strong> {selectedOrder.address}</p>
            <p><strong>Metode Pembayaran:</strong> {selectedOrder.paymentMethod}</p>

            <div className="modal-products">
              {selectedOrder.products.map((product, idx) => (
                <div key={idx} className="product-item">
                  <div className="product-name">{product.name}</div>
                  <div className="product-quantity">x{product.quantity}</div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <strong>Total:</strong> {formatRupiah(selectedOrder.total)}
            </div>

            <button className="close-button" onClick={() => setSelectedOrder(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

