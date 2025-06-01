"use client";

import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { getRequest } from '@/lib/services/request';

const QrScan = () => {
  const [qrData, setQrData] = useState('');
  const [qrDataDummt, setQrDataDummt] = useState('https://example.com/dummy-qr');

  const fetchQR = async () => {
    try {
    //   const res = await axios.get(''); // Proxy to backend
      const res = await getRequest(`/api/qr?deviceId=kiosk-001`);
      console.log(res);
      setQrData(res.data.qrData); // This is the full URL with token
    } catch (err) {
      console.error('Error fetching QR');
    }
  };

  useEffect(() => {
    fetchQR(); // initial
    const interval = setInterval(fetchQR, 30000); // refresh every 30 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2>Scan to Enter</h2>
      {qrData && <QRCodeCanvas value={qrData} size={256} />}
      {/* {qrDataDummt && <QRCodeCanvas value={qrDataDummt} size={256} />} */}
    </div>
  );
}

export default QrScan;