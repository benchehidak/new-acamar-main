'use client';
// import ExamapleOne from "@/components/partials/table/ExampleOne"
import SalesTable from "@/components/partials/table/salesTable";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

export default function bookingPage(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const {data: session} = useSession();
    // console.log(session);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/protected/buyers', {});
          const filteredData = response.data.filter(ticket => ticket.price !== 0);
          setData(filteredData);
          setLoading(false);
          // console.log(response.data);
        } catch (error) {
          setError(error);
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    if(loading) return <Loading/>
    if (session.user.name != "kdeco") return <div>Access Denied</div>
    if(error) return <div>{error.message}</div>
    return(
        <div>
            <SalesTable salesdata={data}/>
        </div>
    )

}