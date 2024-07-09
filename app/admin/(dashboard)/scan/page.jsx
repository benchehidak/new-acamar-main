'use client'

import {QrScanner} from '@yudiel/react-qr-scanner';
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react';

const ClientProtectPage = () => {
  const { data: session } = useSession()
  const qrScannerRef = useRef(null);

  const handleScan = (data) => {
    console.log(data)
    if (data) {
      console.log('Scanned QR code:', data);
      // Handle the scanned QR code data
      //fetch api to update ticket status
        fetch('/api/protected/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticketid: data }),
        })
          .then((res) => res.json())
          .then((json) => {
            alert(json.message);
            window.location.reload();
          });
      }

    };
    console.log(session)
  return (
      <div style={{width: '300px', margin: 'auto'}}>
        <QrScanner
          onDecode={(result) => handleScan(result)}
          onError={(error) => console.log(error?.message)}
          style={{ width: '100%',
    
        
        }}
          scanDelay={3000}  
      />
     
      </div>
  );
}
export default ClientProtectPage