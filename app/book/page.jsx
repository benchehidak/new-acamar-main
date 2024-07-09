'use client';
import UserHeader from "@/components/Header"
// import Card from "@/components/ui/Card";
import Footer from "@/components/Footer";
export default function book()
{
    const columns = [
        {
          label: "City",
          field: "city",
        },
      
        {
          label: "Phone",
          field: "phone",
        },
      ];

        const rows = [
            {
                city: "TUNIS - MENZAH 5",
                phone: "90 165 240",
            },
            {
                city: 'SOUSSE - SAHLOUL',
                phone: '99 617 061',
            },
            {
                city: 'SOUSSE -SAHLOUL',
                phone: '93 158 643'
            },
            {
                city: 'SOUSSE VILLE',
                phone: '25 051 727'
            }
        ]


    return (
        <>
        <UserHeader/>
        <div className="overflow-x-auto -mx-6 text-center" >
          <div className="inline-block min-w-full align-middle" style={{width: '100vw',display: 'flex', justifyContent:'center', color:'#fcfcfc' }}>
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y  table-fixed  " >
                <thead className=" font-semibold text-white-900 dark:text-white" style={{ color:'#fcfcfc'}}>
                  <tr style={{ color:'#fcfcfc'}}>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th " style={{ color:'#fcfcfc'}}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-semibold text-white-900 dark:text-white text-center  " style={{ color:'#fcfcfc'}}>
                  {rows.map((row, i) => (
                    <tr key={i} style={{ color:'#fcfcfc'}}>
                      <td className="table-td" style={{ color:'#fcfcfc'}}>{row.city}</td>
                      <td className="table-td" style={{ color:'#fcfcfc'}}>{row.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer/>
        </>
    )
}