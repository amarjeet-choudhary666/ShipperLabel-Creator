import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const DataScreen = () => {
  const formData = useSelector(state => state.form.formData)

  const renderedData = useMemo(() => {
    return formData.map((data) => {
      const startRange = parseInt(data.startRange) || 1;
      const copies = parseInt(data.loopCount) || 1;
      
      // Skip if any required fields are empty
      if (!data.ProductName || !data.genericName || !data.batchNo || 
          !data.MFGdate || !data.EXPdate || !data.quantity ||
          !data.caseNo || !data.NetWT || !data.grossWT ||
          !data.companyName || !data.companyAddress || !data.companyCountryAndRegion) {
        return null;
      }

      // Return null if startRange equals copies
      if (startRange === copies) {
        return null;
      }

      return Array.from({length: copies - startRange + 1}, (_, index) => {
        if (index >= data.loopCount) return null;
        
        return (
          <div key={`${startRange + index}`} className='dataformat text-[12px] w-full h-[50vh] flex justify-center items-center'>
            <div className='data w-[67%] justify-center'>
                <div className='gst and invoics number w-full border-[2px] border-black'>
                  <div className='flex justify-center border-[1px] border-black'>Shipping Marks</div>
                  <div className='flex justify-center border-[1px] border-black'>IEC: AAIICC3892K</div>
                  <div className='flex justify-center border-[1px] border-black'>GST No. 05AAICC3892K1ZB</div>
                  <div className='flex justify-center border-[1px] border-black'>Invoice No. {data.invoiceNo}</div>

                  <div className='flex w-full'>
                    <div className='datafeilds w-[30%]'>
                      <div className='datafeilds border-[1px] border-black'>Product Name</div>
                      <div className='datafeilds border-[1px] border-black'>GENERIC NAME</div>
                      <div className='datafeilds border-[1px] border-black'>BATCH NO.</div>
                      <div className='datafeilds border-[1px] border-black'>MFG. DT.</div>
                      <div className='datafeilds border-[1px] border-black'>EXP. DT.</div>
                      <div className='datafeilds border-[1px] border-black'>QUANTITY</div>
                      <div className='datafeilds border-[1px] border-black'>CASE NO.</div>
                      <div className='datafeilds border-[1px] border-black'>NET. WT.</div>
                      <div className='datafeilds border-[1px] border-black pb-2'>GROSS. WT.</div>
                    </div>

                    <div className='actualdata w-full border-[1px] border-black'>
                      <div className='datafeilds border-[1px] border-black'> : {data.ProductName}</div>
                      <div className='datafeilds border-[1px] border-black'> : {data.genericName}</div>
                      <div className='datafeilds border-[1px] border-black'> : {data.batchNo}</div>
                      <div className='datafeilds border-[1px] border-black'> : {data.MFGdate}</div>
                      <div className='datafeilds border-[1px] border-black'> : {data.EXPdate}</div>
                      <div className='datafeilds border-[1px] border-black'> : {data.quantity}</div>
                      <div className='datafeilds border-[1px] border-black flex justify-end'>
                          <h6 className='border-[1px] border-black px-2'>{data.caseNo}</h6>
                          <h6 className='border-[1px] border-black px-2'>{startRange + index} </h6>
                      </div>
                      <div className='datafeilds border-[1px] border-black'>: {data.NetWT} kg</div>
                      <div className='datafeilds pb-[3.4px] border-[1px] border-black'>: {data.grossWT} kg</div>
                    </div>
                  </div>

                  <div className='exporter details border-black border-[1px]'>
                    <h1 className='border-[1px] border-black font-bold underline'>Consignee :</h1>
                    <div className='Name of company border-[1px] border-black'>
                      <h3>{data.companyName}</h3>
                    </div>
                    <div className='address of consignment border-[1px] border-black'>
                      <h3>{data.companyAddress}</h3>
                    </div>
                    <div className='country and region of company'>
                      <h3>{data.companyCountryAndRegion}</h3>
                    </div>
                  </div>

                  <div className='exporter details border-black border-[1px]'>
                    <h1 className='border-[1px] border-black font-bold underline'>Exporter</h1>
                    <div className='Name of company border-[1px] border-black'>
                      <h3>Cureton Biotech Pvt Ltd.</h3>
                    </div>
                    <div className='address of consignment border-[1px] border-black'>
                      <h3>Khasra No.251 & 252, Sisona, Bhagwanpur</h3>
                    </div>
                    <div className='country and region of company'>
                      <h3>Roorkee, Haridwar, Uttarakhand-247661 (INDIA)</h3>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        )
      })
    })
  }, [formData])

  return (
    <div className='text-[15px]'>
      {renderedData}
    </div>
  )
}

export default DataScreen
