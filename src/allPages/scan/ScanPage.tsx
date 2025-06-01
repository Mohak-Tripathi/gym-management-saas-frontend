// "use client";

// import { useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';
// import axios from 'axios';

// const ScanPage = () => {
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');

//   useEffect(() => {
//     const punchAttendance = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.post('http://localhost:4000/api/attendance/punch', {
//           token,
//         }, {
//           // Remove Authorization if not needed
//           headers: {
//             // 'Authorization': `Bearer user-jwt-token` 
//           }
//         });

//         alert(res.data.message);
//       } catch (err: any) {
//         alert(err?.response?.data?.message || 'Attendance Punch Failed');
//       }
//     };

//     punchAttendance();
//   }, [token]);

//   return <div>Processing attendance...</div>;
// };

// export default ScanPage;


"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { postRequest } from '@/lib/services/request';

const ScanPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const punchAttendance = async () => {
      if (!token) return;

      try {
        // const res = await axios.post('/api/attendance/punch/qr', {
        //   token,
        // });

        const res = await postRequest("/api/attendance/punch/qr", {
          token,
        });

        alert(res.data.message);
      } catch (err: any) {
        alert(err?.response?.data?.message || 'Attendance Punch Failed');
      }
    };

    punchAttendance();
  }, [token]);

  return <div>Processing attendance...</div>;
};

export default ScanPage;
