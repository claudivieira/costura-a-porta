import React from 'react'

type requestServiceBtnProps = {
  extraStyles: string
}


const RequestServiceBtn = ({ extraStyles }: requestServiceBtnProps) => {
  return (
    <a 
            className={`border rounded-lg px-6 h-10 uppercase inline-flex items-center justify-center ${extraStyles}`}
            href="https://wa.link/1v15kn"
            target="_blank"
            rel="noopener noreferrer"
        >
            Pedir Arranjo
        </a>
  )
}

export default RequestServiceBtn
